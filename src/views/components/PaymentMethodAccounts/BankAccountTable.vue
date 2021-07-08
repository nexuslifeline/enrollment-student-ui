<template>
  <b-table
    :fields="tables.bankAccounts.fields"
    :items.sync="tables.bankAccounts.items"
    bordered small responsive
    :busy="tables.bankAccounts.isBusy"
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
import { BankAccountApi } from '../../../mixins/api'
export default {
  mixins: [ BankAccountApi ],
  data() {
    return  {
      tables: {
        bankAccounts: {
          isBusy: false,
          fields: [
            {
              key: "bank",
              label: "Bank",
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
              key: "accountNumber",
              label: "Account No.",
              tdClass: "align-middle",
              thStyle: { width: "25%" }
            },
          ],
          items: []
        },
      }
    }
  },
  created() {
    this.loadBankAccounts()
  },
  methods: {
    loadBankAccounts() {
      const params = { paginate: false }
      const { bankAccounts } = this.tables
      bankAccounts.isBusy = true
      this.getBankAccountList(params).then(({ data }) => {
        bankAccounts.items = data
        bankAccounts.isBusy = false
      }).catch((error) =>{
        bankAccounts.isBusy = false
      })
    },
  }
}
</script>

<style>

</style>