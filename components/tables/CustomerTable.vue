<template>
  <div class="bg-white overflow-auto p-4 customer-table">
    <b-row no-gutters align-h="between" class="mb-3">
      <b-col cols="12" lg="6" class="d-flex">
        <b-form inline @submit.prevent="$emit('search', search)">
          <b-form-input
            v-model.trim="search"
            type="search"
            outlined
            class="mr-2"
            preppend-icon-inner="search"
            placeholder="Search..."
          />
          <b-button type="submit" variant="dark" squared class="px-3 mr-2"
            >Search</b-button
          >
          <b-button
            v-if="search"
            variant="warning"
            squared
            class="px-3"
            @click.prevent="clearSearch"
            >Clear</b-button
          >
        </b-form>
      </b-col>
      <b-col cols="12" lg="4">
        <div class="d-flex justify-content-end">
          <b-button
            squared
            class="mr-4 export-button text-capitalize"
            :to="{
              name:
                users === 'customers'
                  ? 'admin-clients-upload'
                  : `admin-${users}-upload`,
            }"
          >
            Upload {{ users }}
            <b-icon icon="chevron-right" class="ml-1" scale="0.75" />
          </b-button>
          <b-button
            squared
            class="export-button"
            @click.prevent="$emit('export', true)"
          >
            Export
            <b-icon icon="download" class="ml-1" scale="0.75" />
          </b-button>
        </div>
      </b-col>
    </b-row>

    <b-table
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
            data.item.realtor_tree ? data.item.realtor_tree.downline_count : 0
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
      <template #cell(status)="data">
        <div class="text-center">
          <b-badge
            pill
            class="px-2 py-1 text-white"
            :variant="data.item.auth.is_active ? 'success' : 'warning'"
            >{{ data.item.auth.is_active ? 'Active' : 'Inactive' }}</b-badge
          >
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      required: true,
    },
    filterOptions: {
      type: Array,
      required: false,
      default: () => [],
    },
    items: {
      type: Array,
      required: true,
    },
    users: {
      required: false,
      default: 'customers',
      type: String,
    },
  },
  data() {
    return {
      selectAll: false,
      selected: [],
      search: '',
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
