<template>
  <div class="bg-white overflow-auto p-4 customer-table rounded-lg mb-4">
    <b-row no-gutters align-h="between" class="mb-3">
      <b-col cols="12" lg="6" class="d-flex">
        <b-form inline @submit.prevent="$emit('search', search)">
          <b-form-input
            v-model.trim="search"
            type="search"
            outlined
            class="mr-2 table-search"
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
      <b-col cols="12" lg="2">
        <div class="d-flex">
          <b-button
            squared
            class="ml-auto export-button"
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
      table-class="rounded-lg"
      thead-class="bg-gray-400 text-uppercase text-sm-2"
      tbody-class="text-sm"
      :selectable="true"
      hover
      responsive
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
          :checked="selectAll && items.length === selected.length"
          @click="selectAll = !selectAll"
        />
      </template>
      <template #cell(client)="data">
        <div class="text-left p-1 rounded-lg">
          {{ data.item.customer.lastname }} {{ data.item.customer.firstname }}
        </div>
      </template>
      <template #cell(sales)="data">
        <div class="text-left p-1 rounded-lg">
          Payment for {{ data.item.units }}
          {{ data.item.units > 1 ? 'units' : 'unit' }} at
          {{ data.item.product.name }}
        </div>
      </template>
      <template #cell(total_amount)="data">
        <div class="text-left p-1 rounded-lg">
          N{{ $formatAsMoney($fromKobo(data.item.total_amount)) }}
        </div>
      </template>
      <template #cell(amount_paid)="data">
        <div class="text-left p-1 rounded-lg">
          N{{ $formatAsMoney($fromKobo(data.item.amount_paid)) }}
        </div>
      </template>
      <template #cell(date)="data">
        <div class="text-left p-1 rounded-lg text-capitalize">
          {{ data.item.created_at | luxon }} -
          {{ data.item.updated_at | luxon }}
        </div>
      </template>

      <template #cell(allocations)="data">
        <div class="text-left p-1 rounded-lg text-capitalize">
          {{ data.item.allocations.join(', ') }}
        </div>
      </template>

      <template #cell(is_allocated)="data">
        <div class="text-left">
          <b-badge
            pill
            class="px-2 py-1 text-white text-capitalize"
            :variant="(data.item.is_allocated && 'success') || 'warning'"
          >
            {{ (data.item.is_allocated && 'Yes') || 'No' }}
          </b-badge>
        </div>
      </template>
      <template #cell(actions)="data">
        <b-button
          variant="dark"
          size="sm"
          @click="toggleAllocationModal(data.item)"
          >Allocate</b-button
        >
      </template>
    </b-table>
    <paginate
      v-if="pagination.total"
      :per-page="pagination.limit"
      :total-rows="pagination.total"
      @to="fetchData"
    />
    <allocate :edit="edit" :allocation="allocation" @completed="refreshData" />
  </div>
</template>

<script>
export default {
  components: {
    Paginate: () => import('@/components/Paginate'),
    Allocate: () => import('@/components/modals/Allocate'),
  },
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
    pagination: {
      required: false,
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      selectAll: false,
      selected: [],
      search: '',
      allocation: {},
      edit: false,
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
    toggleAllocationModal(item) {
      this.edit = item.is_allocated
      this.allocation = { allocations: item.allocations, id: item.id }
      this.$bvModal.show('allocate-product')
    },
    refreshData() {
      this.$emit('refreshData', true)
    },
    fetchData(e) {
      this.$emit('goToPage', e)
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
  .table-search {
    background: #f9f9fa;
    border: 2px solid rgba(0, 121, 214, 0.06);
  }
  .export-button {
    background: rgba(#0911e4, 0.1);
    color: #0911e4;
    border: 1px solid #0911e4;
  }
  thead {
    background: #e0e0e0;
    color: rgba(#0c0c0d, 0.5);
  }
  tr {
    td {
      vertical-align: middle;
    }
  }
}
</style>
