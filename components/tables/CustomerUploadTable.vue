<template>
  <div class="bg-white overflow-auto p-4 customer-table">
    <b-row no-gutters align-h="between" class="mb-3">
      <b-col cols="12" lg="6" class="d-flex align-items-center">
        <b-button
          squared
          class="export-button mb-2 mb-lg-0"
          href="/Sabreworks_bulk_upload_sample.csv"
          download
        >
          Download Template
          <b-icon icon="download" class="ml-1" scale="0.75" />
        </b-button>
      </b-col>
      <b-col cols="12" lg="6">
        <div class="d-flex align-items-center justify-content-lg-end">
          <input
            id="upload-sheet"
            type="file"
            class="d-none"
            name="image"
            placeholder="Choose a file or drop it here..."
            @change="uploadSheet($event.target.files[0])"
          />
          <label
            squared
            class="export-button squared btn btn-info mr-4 mb-0"
            for="upload-sheet"
          >
            <b-icon icon="cloud-upload" class="ml-1" scale="0.75" />
            Upload File</label
          >
          <b-button
            v-if="items.length"
            variant="success"
            class="text-white"
            @click.prevent="uploadData"
            >Confirm Upload</b-button
          >
        </div>
      </b-col>
    </b-row>

    <b-table
      v-if="!uploadProcessed"
      ref="clientsTable"
      thead-class="bg-gray-400 text-uppercase text-sm-2"
      tbody-class="text-sm"
      :selectable="true"
      hover
      responsive
      bordered
      striped
      :items="items"
      :fields="fields"
      @row-selected="onRowSelected"
    >
      <template #cell(check)="{ rowSelected, index }" class="align-middle">
        <div class="d-flex justify-content-center align-items-center">
          <input
            type="checkbox"
            :checked="rowSelected"
            @click="handleRowSelect(rowSelected, index)"
          />
        </div>
      </template>
      <template #head(check)="">
        <input
          type="checkbox"
          :checked="selectAll && items.length == selected.length"
          @click="selectAll = !selectAll"
        />
      </template>
      <template #cell(fullname)="data">
        <div class="text-center p-1 rounded-lg">
          {{ data.item.firstname }} {{ data.item.lastname }}
        </div>
      </template>
      <template #cell(gender)="data">
        <div class="text-center p-1 rounded-lg text-capitalize">
          {{ data.item.gender }}
        </div>
      </template>
      <template #cell(downline)="data">
        <div class="text-center p-1 rounded-lg text-capitalize">
          {{
            (data.item.realtor_tree && data.item.realtor_tree.downline_count) ||
            0
          }}
        </div>
      </template>
      <template #cell(state_of_origin)="data">
        <div class="text-center p-1 rounded-lg text-capitalize">
          {{ data.item.state_name || 'N/A' }}
        </div>
      </template>
      <template #cell(registration_date)="data">
        <div class="text-center p-1 rounded-lg text-capitalize">
          {{ data.item.created_at | luxon }}
        </div>
      </template>
    </b-table>
    <b-table
      v-if="uploadProcessed"
      ref="clientsTable"
      thead-class="bg-gray-400 text-uppercase text-sm-2"
      tbody-class="text-sm"
      :selectable="true"
      hover
      responsive
      bordered
      striped
      :items="processed"
      :fields="processedFields"
      @row-selected="onRowSelected"
    >
      <template #cell(check)="{ rowSelected, index }" class="align-middle">
        <div class="d-flex justify-content-center align-items-center">
          <input
            type="checkbox"
            :checked="rowSelected"
            @click="handleRowSelect(rowSelected, index)"
          />
        </div>
      </template>
      <template #head(check)="">
        <input
          type="checkbox"
          :checked="selectAll && items.length == selected.length"
          @click="selectAll = !selectAll"
        />
      </template>
      <template #cell(status)="data">
        <div class="text-center p-1 rounded-lg">
          <p
            class="mb-0"
            :class="{
              'text-success': data.item.status,
              'text-danger': !data.item.status,
            }"
          >
            {{ (data.item.status && 'Success') || 'Failed' }}
          </p>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import Papa from 'papaparse'
import { mapActions } from 'vuex'

export default {
  props: {
    fields: {
      type: Array,
      required: false,
      default: () => [
        'firstname',
        'lastname',
        'middlename',
        'email',
        'role_name',
        'phone',
        'dob',
        'referral_code',
        'gender',
        'marital_status',
        'address',
        'country',
        'next_of_kin_address',
        'next_of_kin_full_name',
        'next_of_kin_phone',
        'next_of_relationship',
      ],
    },
    users: {
      required: false,
      default: 'customers',
      type: String,
    },
    filterOptions: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      selectAll: false,
      uploadProcessed: false,
      processed: [],
      processedFields: [
        'firstname',
        'lastname',
        'email',
        'phone',
        { key: 'status', sortable: true },
        'reason',
      ],
      defaultFields: [
        'firstname',
        'lastname',
        'middlename',
        'email',
        'role_name',
        'phone',
        'dob',
        'referral_code',
        'gender',
        'marital_status',
        'address',
        'country',
        'next_of_kin_address',
        'next_of_kin_full_name',
        'next_of_kin_phone',
        'next_of_relationship',
      ],
      selected: [],
      search: '',
      items: [],
    }
  },
  watch: {
    selectAll(v) {
      if (!v) {
        this.clearSelected()
      } else {
        this.selectAllRows()
      }
    },
  },
  methods: {
    ...mapActions({
      bulkUpload: 'customer/bulkUpload',
    }),
    async uploadSheet(sheet) {
      this.uploadProcessed = false
      this.processed = []
      const loader = this.$loading.show()
      await Papa.parse(sheet, {
        header: 'greedy',
        delimiter: ',',
        skipEmptyLines: true,
        complete: (response) => {
          this.items = response.data
          loader.hide()
        },
        error(e) {
          this.$Toast.fire({
            icon: 'error',
            title: e,
          })
        },
      })
    },
    async uploadData() {
      const loader = this.$loading.show()
      try {
        const response = await this.bulkUpload({ customers: this.items })
        this.uploadProcessed = true
        loader.hide()
        const { successfulRecords, failedRecord } = response.payload
        if (failedRecord.length > 0) {
          this.$Toast.fire({
            icon: 'error',
            title:
              'Please remove completed rows, fix error in failed row and upload remaining data',
          })
        } else {
          this.$Toast.fire({
            icon: 'success',
            title: 'All Data uploaded',
          })
        }
        this.processed = [...successfulRecords, ...failedRecord]
        this.items = []
      } catch (e) {
        loader.hide()
        await this.$Toast.fire({
          icon: 'error',
          title: this.$formatError(e),
        })
      }
    },
    clearSearch() {
      this.search = ''
      this.$emit('search', '')
    },
    onRowSelected(items) {
      this.selected = items
    },
    selectAllRows() {
      this.$refs.clientsTable.selectAllRows()
    },
    clearSelected() {
      this.$refs.clientsTable.clearSelected()
    },
    selectRow(index) {
      this.$refs.clientsTable.selectRow(index)
    },
    unSelectRow(index) {
      this.$refs.clientsTable.unselectRow(index)
    },
    handleRowSelect(isRowSelected, index) {
      if (!isRowSelected) {
        this.selectRow(index)
      } else {
        this.unSelectRow(index)
      }
    },
  },
}
</script>
<style lang="scss">
.customer-table {
  input[type='search'] {
    border-radius: 0;
  }
  .export-button {
    background: rgba(#0911e4, 0.1);
    color: #0911e4;
    border: 1px solid #0911e4;
  }
  thead {
    background: #e0e0e0;
  }
  tr {
    td {
      vertical-align: middle;
    }
  }
}
</style>
