<template>
  <div class="ledger__main-container">
    <div class="left-pane">
      <p class="sub-nav__title">Scool Years</p>
        <ul class="sub-nav">
          <li
            v-for="(item, idx) in options.schoolYear.items"
            @click="onSelectSchoolYear(item.id, idx)"
            :key="idx"
            class="sub-nav__item"
            :class="{ active: idx === selectedNavIndex }"
          >
          <span class="sub-nav__link"> {{ item.name }} </span>
          </li>
        </ul>
    </div>
    <div class="right-pane">
      <div class="filters">
        <label class="mr-2"> As of Date : </label>
        <b-form-datepicker
          v-model="filters.ledger.asOfDate"
          style="max-width: 250px"
          @input="loadLedger()"
        />
      </div>
      <b-table
        small outlined show-empty
        :fields="tables.ledgers.fields"
        :busy="tables.ledgers.isBusy"
        :items="tables.ledgers.items">
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
    </div>
  </div>
</template>

<script>
import { SchoolYearApi, StudentApi } from '../../../mixins/api'
import { formatNumber } from "../../../helpers/forms"
import SchoolYear from '../../../mixins/api/SchoolYear'
export default {
  mixins: [ SchoolYearApi, StudentApi ],
  data() {
    return {
      options: {
        schoolYear: {
          items: []
        }
      },
      tables: {
        ledgers: {
          isBusy: false,
          fields: [
            {
							key: "txnDate",
							label: "Date",
							tdClass: "align-middle",
              thStyle: {width: "15%"},
            },
            {
							key: "txnType",
							label: "Details",
							tdClass: "align-middle",
              thStyle: {width: "15%"},
            },
            {
							key: "reference",
							label: "Reference No",
							tdClass: "align-middle",
              thStyle: {width: "15%"},
            },
            {
							key: "debit",
							label: "Debit",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              thStyle: {width: "15%"},
              formatter: (value) => {
                return formatNumber(value)
              }
            },
            {
							key: "credit",
							label: "Credit",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              thStyle: {width: "15%"},
              formatter: (value) => {
                return formatNumber(value)
              }
            },
            {
							key: "balance",
							label: "Balance",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              thStyle: {width: "15%"},
              formatter: (value) => {
                return formatNumber(value)
              }
            },
          ],
          items: []
        }
      },
      filters: {
        ledger: {
          schoolYearId: null,
          asOfDate: new Date()
        }
      },
      selectedNavIndex: null,

    }
  },
  methods: {
    loadSchoolYear() {
      const params = { paginate: false }
      const { schoolYear } = this.options
      const { ledger } = this.filters
      this.getSchoolYearList(params).then(({ data  }) => {
        schoolYear.items = data
        this.selectedNavIndex = schoolYear.items.findIndex(e => e.id === ledger.schoolYearId)
      })
    },
    loadLedger() {
      const studentId = this.$store.state.user.id;
      const { schoolYearId, asOfDate } = this.filters.ledger
      const params = { paginate: false, schoolYearId, asOfDate }
      const { ledgers } = this.tables
      ledgers.isBusy = true

      this.getLedgerOfStudent(studentId, params).then(( { data }) => {
        ledgers.items = data
        ledgers.isBusy = false
      })

    },
    onSelectSchoolYear(schoolYearId, index ){
      this.selectedNavIndex = index
      console.log(schoolYearId)
      this.filters.ledger.schoolYearId = schoolYearId
      this.loadLedger()
    }
  },
  created() {
    this.filters.ledger.schoolYearId = this.activeSchoolYear.id ?? null
    this.loadSchoolYear()
    this.loadLedger()
  },
  computed: {
    activeSchoolYear() {
      return this.$store.state.activeSchoolYear || {};
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/shared.scss";
  .ledger__main-container {
    height: 100%;
    display: flex;
    @include for-size(phone-only) {
      flex-direction: column;
      padding: 20px 20px 0 20px;
    }
  }

  .sub-nav {
    list-style: none;
    padding: 0;
  }

  .sub-nav__item {
    margin-bottom: 10px;
    padding: 6px 20px;

    &.active {
      background-color: $light-blue-10;
      border-radius: 3px;

      .sub-nav__link {
        color: $brand-primary;
        font-weight: 500;
      }
    }

    &:hover {
      cursor: pointer;
    }
  }

  .sub-nav__title {
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .left-pane {
    min-width: 230px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-right: 1px solid $light-gray-10;
  }

  .sub-nav__link {
    font-size: 14px;
    color: $black;
  }

  .right-pane {
    flex: 1;
    border: solid whitesmoke 1px;
    padding:30px;

    @include for-size(phone-only) {
      margin-top: 20px;
    }
  }

  .filters {
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    align-items: center;
  }

  
</style>