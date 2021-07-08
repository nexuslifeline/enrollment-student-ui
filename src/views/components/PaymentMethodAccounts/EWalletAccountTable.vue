<template>
  <b-table
    :fields="tables.eWalletAccounts.fields"
    :items.sync="tables.eWalletAccounts.items"
    bordered small responsive
    :busy="tables.eWalletAccounts.isBusy"
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
import { EWalletAccountApi } from '../../../mixins/api'
export default {
  mixins: [EWalletAccountApi],
  data() {
    return  {
      tables: {
        eWalletAccounts: {
          isBusy: false,
          fields: [
            {
              key: "provider",
              label: "Provider",
              tdClass: "align-middle",
              thStyle: { width: "25%" }
            },
            {
              key: "accountName",
              label: "Account Name",
              tdClass: "align-middle",
              thStyle: { width: "auto" }
            },
            {
              key: "accountId",
              label: "Account ID",
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
    this.loadEWalletAccounts()
  },
  methods: {
    loadEWalletAccounts() {
      const params = { paginate: false }
      const { eWalletAccounts } = this.tables
      eWalletAccounts.isBusy = true
      this.getEWalletAccountList(params).then(({ data }) => {
        eWalletAccounts.items = data
        eWalletAccounts.isBusy = false
      }).catch((error) =>{
        eWalletAccounts.isBusy = false
      })
    },
  }
}
</script>

<style>

</style>