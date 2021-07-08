<template>
  <b-table
    :fields="tables.peraPadalaAccounts.fields"
    :items.sync="tables.peraPadalaAccounts.items"
    bordered small responsive
    :busy="tables.peraPadalaAccounts.isBusy"
    show-empty>
    <template v-slot:table-busy>
      <div class="text-center my-2">
        <v-icon
          name="spinner"
          spin
          class="mr-2" />
        <strong>Loading...</strong>
      </div>
    </template>
  </b-table>
</template>

<script>
import { PeraPadalaAccountApi } from '../../../mixins/api'
export default {
  mixins: [PeraPadalaAccountApi],
  data() {
    return  {
      tables: {
        peraPadalaAccounts: {
          isBusy: false,
          fields: [
            {
              key: "provider",
              label: "Provider",
              tdClass: "align-middle",
              thStyle: { width: "25%" }
            },
            {
              key: "receiverName",
              label: "Receiver Name",
              tdClass: "align-middle",
              thStyle: { width: "auto" }
            },
            {
              key: "receiverMobileNo",
              label: "Receiver Mobile No",
              tdClass: "align-middle",
              thStyle: { width: "25%" }
            },
          ],
          items:  []
        },
      }
    }
  },
  created() {
    this.loadPeraPadalaAccounts()
  },
  methods: {
    loadPeraPadalaAccounts() {
      const params = { paginate: false }
      const { peraPadalaAccounts } = this.tables
      peraPadalaAccounts.isBusy = true
      this.getPeraPadalaAccountList(params).then(({ data }) => {
        peraPadalaAccounts.items = data
        peraPadalaAccounts.isBusy = false
      }).catch((error) =>{
        peraPadalaAccounts.isBusy = false
      })
    },
  }
}
</script>

<style>

</style>