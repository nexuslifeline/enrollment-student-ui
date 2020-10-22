<template>
    <div class="payment__main-container">
      <div class="payment-container">
        <div class="billing-container">
          <h5 class="mb-4 mt-2">BILLING INFORMATION</h5>
          <b-row>
            <b-col md=6>
              <b-row>
                <b-col md=12>
                   <b-form-group
                    label="Billing No">
                    <b-form-input v-model="forms.billing.fields.billingNo" disabled/>
                  </b-form-group>
                </b-col>
                <b-col md=12>
                   <b-form-group
                    label="Due Date">
                    <b-form-input v-model="forms.billing.fields.dueDate" disabled/>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
            <b-col md=6>
               <b-row>
                <b-col md=12>
                  <b-row>
                    <b-col md=6>
                      <b-form-group
                        label="Previous Balance">
                          <b-form-input
                            v-model="getSignedPreviousBalance"
                            class="text-right"
                            disabled/>
                      </b-form-group>
                    </b-col>
                    <b-col md=6>
                      <b-form-group
                        label="Current Due">
                        <vue-autonumeric
                          v-model="forms.billing.fields.totalAmount"
                          class="form-control text-right"
                          :options="[{ minimumValue: 0, modifyValueOnWheel: false, emptyInputBehavior: 0, }]"
                          :state="forms.payment.states.amount"
                          debounce="500"
                          disabled/>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col md=12>
                  <b-form-group
                      label="Less: Total Paid">
                    <vue-autonumeric
                      v-model="forms.billing.fields.totalPaid"
                      class="form-control text-right"
                      :options="[{ minimumValue: 0, modifyValueOnWheel: false, emptyInputBehavior: 0 }]"
                      :state="forms.payment.states.totalPaid"
                      debounce="500"
                      disabled/>
                  </b-form-group>
                  <b-form-group
                      label="Remaining Balance">
                    <b-form-input
                      v-model="getSignedRemainingBalance"
                      class="text-right"
                      disabled/>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
        <div class="payment-mode-container">
          <b-card border-variant="warning">
            <b-alert show>
              <b-form-group>
                <!--  -->
                <b-form-radio-group
                v-model="forms.payment.fields.paymentModeId"
                  stacked>
                  <b-form-radio
                    v-for="paymentMode in options.paymentModes.items"
                    :value="paymentMode.id"
                    :key="paymentMode.id">
                    <strong> {{ paymentMode.name }} </strong>
                    <br>
                    <small> {{ paymentMode.description }} </small>
                  </b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-alert>
          </b-card>
          <p>
            You have until <strong>{{ getFormattedDueDate }}</strong> to make the payment.
            This reference number will not be valid until that.
          </p>
        </div>
        <div class="payment-step-container">
          <span class="payment-step__number">1</span>
          <div class="payment-step-details-container">
            <div >
              <span v-if="forms.payment.fields.paymentModeId === 1">Choose your preferred bank.
              You can deposit/transfer your payment in any bank listed below.</span>
              <span v-if="forms.payment.fields.paymentModeId === 4">Choose your preferred Account.</span>
              <span v-if="forms.payment.fields.paymentModeId === 5">Choose your preferred Pera Padala provider.</span>
              <span v-if="forms.payment.fields.paymentModeId === 3">Confirmation of your payment. <br>After paying to your preferred account. Attach deposit slip or any proof of payment.</span>
              <b-table
                v-if="forms.payment.fields.paymentModeId === 1"
                :fields="tables.bankAccounts.fields"
                :items.sync="tables.bankAccounts.items"
                borderless small responsive
                :busy="tables.bankAccounts.isBusy">
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
              <b-table
                v-if="forms.payment.fields.paymentModeId === 4"
                :fields="tables.eWalletAccounts.fields"
                :items.sync="tables.eWalletAccounts.items"
                borderless small responsive
                :busy="tables.bankAccounts.isBusy">
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
              <b-table
                v-if="forms.payment.fields.paymentModeId === 5"
                :fields="tables.peraPadalaAccounts.fields"
                :items.sync="tables.peraPadalaAccounts.items"
                borderless small responsive
                :busy="tables.bankAccounts.isBusy">
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
            <!-- <span v-if="payTypeId === PayTypes.ATTACHMENT.id || forms.payment.fields.paymentModeId === 3">Please attach any proof of your payment or your receipt provided by the St. Theresa College.</span> -->
          </div>
        </div>
        <div v-if="forms.payment.fields.paymentModeId !== 3" class="payment-step-container">
          <span class="payment-step__number">2</span>
          <div class="payment-step-details-container">
            <span>Confirmation of your payment.</span>
            <span>After paying to your preferred account. Attach deposit slip or any proof of payment.</span>
          </div>
        </div>
        <div class="file-uploader-container">
          <FileUploader
            @onFileChange="onPaymentFileUpload"
            @onFileDrop="onPaymentFileUpload" />
        </div>
        <div class="file-item-container">
          <FileItem
            v-for="(item, index) of paymentFiles"
            :key="index"
            :title="item.name"
            :description="item.notes"
            :fileIndex="index"
            :isBusy="item.isBusy"
            @onFileItemRemove="onDeletePaymentFile"
            @onFileItemPreview="previewPaymentFile"
            @onFileItemSelect="onPaymentFileItemSelect"
          />
        </div>
        <div class="payment-step-container mb-3">
          <span class="payment-step__number">{{ forms.payment.fields.paymentModeId === 3 ? 2 : 3 }}</span>
          <div class="payment-step-details-container">
            <span>Enter the details of your proof of payment or deposit slip.</span>
          </div>
        </div>
        <div class="payment-form-container">
          <b-row>
            <b-col md=12>
              <b-row>
                <b-col md=4>
                  <b-form-group>
                    <label>Enter amount you pay</label>
                    <vue-autonumeric
                      v-model="forms.payment.fields.amount"
                      class="form-control text-right"
                      :class="forms.payment.states.amount === false ? 'is-invalid' : ''"
                      :options="[{ minimumValue: 0, modifyValueOnWheel: false, emptyInputBehavior: 0 }]"
                      :state="forms.payment.states.amount"
                      debounce="500"
                      :disabled="paymentFiles.length > 0 ? false : true">
                    </vue-autonumeric>
                    <b-form-invalid-feedback>
                      {{ forms.payment.errors.amount }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col md=4>
                  <b-form-group>
                    <label>Transaction No</label>
                    <b-form-input
                      v-model="forms.payment.fields.transactionNo"
                      :state="forms.payment.states.transactionNo"
                      debounce="500"
                      :disabled="paymentFiles.length > 0 ? false : true"
                    />
                    <b-form-invalid-feedback>
                      {{ forms.payment.errors.transactionNo }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col md=4>
                  <b-form-group>
                    <label>Date Paid</label>
                    <b-form-input
                      type="date"
                      v-model="forms.payment.fields.datePaid"
                      :state="forms.payment.states.datePaid"
                      :disabled="paymentFiles.length > 0 ? false : true"
                    />
                    <b-form-invalid-feedback>
                      {{ forms.payment.errors.datePaid }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md=12>
                  <b-form-group>
                    <label>Add Notes</label>
                    <b-form-textarea
                      rows="4"
                      v-model="forms.payment.fields.notes"
                      :state="forms.payment.states.notes"
                      debounce="500"
                      :disabled="paymentFiles.length > 0 ? false : true"
                    ></b-form-textarea>
                    <b-form-invalid-feedback>
                      {{ forms.payment.errors.notes }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
        <div class="application__action-bar">
          <b-button
            variant="outline-secondary"
            class="application__back-action"
            :to="'/statements'">
            Back
          </b-button>
          <b-button
            variant="primary"
            class="application__main-action"
            @click="onSavePayment">
            <v-icon
              v-if="isProcessing"
              name="sync"
              class="mr-2"
              spin />
              Submit Payment
          </b-button>
        </div>
      </div>
      <FileViewer
        :show="fileViewer.paymentFile.show"
        :file="file"
        :isBusy="file.isLoading"
        :owner="file.owner"
        @close="fileViewer.paymentFile.show = false"
        @onNavLeft="onPaymentFileNavLeft"
        @onNavRight="onPaymentFileNavRight"
        :navCount="fileViewer.paymentFile.activeNavCount"
        :navActiveIndex="fileViewer.paymentFile.activeNavIndex"
        :enableArrowNav="fileViewer.paymentFile.isActiveNavEnabled"
      />
      <b-modal
        v-model="showPaymentFileModal"
        centered
        header-bg-variant="success"
        header-text-variant="light"
        :noCloseOnEsc="true"
        :noCloseOnBackdrop="true">
        <div slot="modal-title"> <!-- modal title -->
          Payment File
        </div> <!-- modal title -->
        <b-row> <!-- modal body -->
          <b-col md=12>
            <label>Notes</label>
            <b-textarea
              v-model="forms.paymentFile.fields.notes"
              :state="forms.paymentFile.states.notes"
              rows=7
              debounce="500" />
            <b-form-invalid-feedback>
              {{ forms.paymentFile.errors.notes }}
            </b-form-invalid-feedback>
          </b-col>
        </b-row>
        <div slot="modal-footer" class="w-100"><!-- modal footer buttons -->
          <b-button
            @click="onUpdatePaymentFile()"
            class="float-right"
            variant="outline-primary">
            <v-icon
              v-if="isFileUpdating"
              name="sync"
              class="mr-2"
              spin
            />
            Update
          </b-button>
        </div>
      </b-modal>
    </div>
</template>

<script>

import { copyValue } from '../../../helpers/extractor';
import { paymentMethods } from '../../../content';
import { PaymentStatuses, } from "../../../helpers/enum";
import FileViewer from "../../components/FileViewer";
import FileItem from "../../components/FileItem";
import FileUploader from "../../components/FileUploader";
import { BankAccountApi, EWalletAccountApi, PeraPadalaAccountApi, BillingApi, PaymentApi, SchoolYearApi, PaymentFileApi } from "../../../mixins/api";
import { format } from 'date-fns';
import { validate, reset, formatNumber, showNotification } from '../../../helpers/forms';

const paymentFields = {
  id: null,
  transactionNo: null,
  amount: 0,
  datePaid: null,
  paymentModeId: 1,
  notes: null,
  paymentStatusId: PaymentStatuses.SUBMITTED.id,
  disapprovalNotes: null,
  submittedDate: format(new Date(), 'yyyy-MM-dd'),
  billingId: null,
  studentId: null,
  schoolYearId: null,
}

const paymentErrorFields = {
  transactionNo: null,
  amount: null,
  datePaid: null,
  paymentModeId: null,
  notes: null
}

const billingFields = {
  id: null,
  billingNo: null,
  dueDate: null,
  totalAmount: null,
  previousBalance: null,
  totalPaid: null,
}

const paymentFileFields = {
  id: null,
  notes: null
}

export default {
  components: {
    FileViewer, FileItem, FileUploader
  },
  mixins: [ BankAccountApi, EWalletAccountApi, PeraPadalaAccountApi, BillingApi, PaymentApi, SchoolYearApi, PaymentFileApi ],
  data() {
    return {
      isProcessing: false,
      PaymentStatuses: PaymentStatuses,
      paymentFiles: [],
      selectedBilling: null,
      lastActiveFile: null,
      selectFileIndex: null,
      activeSchoolYear: null,
      attachments: [],
      showPaymentFileModal: false,
      isFileUpdating: false,
      fileViewer: {
        paymentFile: {
          isActiveNavEnabled: false,
          activeNavCount: 0,
          activeNavIndex: 0,
          show: false,
        },
      },
      file: {
        type: null,
        src: null,
        name: null,
        notes: null,
        isLoading: false
      },
      forms: {
        payment: {
          fields: { ...paymentFields },
          states: { ...paymentErrorFields },
          errors: { ...paymentErrorFields }
        },
        paymentFile: {
          fields: { ...paymentFileFields },
          states: { ...paymentFileFields },
          errors: { ...paymentFileFields }
        },
        billing: {
          fields: { ...billingFields },
          states: { ...billingFields },
          errors: { ...billingFields }
        },
      },
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
      },
      options: {
        paymentModes: {
          items: [
            ...paymentMethods
          ]
        },
      }
    }
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
    loadPeraPadalaAccounts() {
      const params = { paginate: false }
      const { peraPadalaAccounts } = this.tables
      peraPadalaAccounts.isBusy = true
      this.getPeraPadalaAccountList(params).then(({ data }) => {
        peraPadalaAccounts.items = data
      }).catch((error) =>{
        peraPadalaAccounts.isBusy = false
      })
    },
    loadEWalletAccounts() {
      const params = { paginate: false }
      const { eWalletAccounts } = this.tables
      eWalletAccounts.isBusy = true
      this.getEWalletAccountList(params).then(({ data }) => {
        eWalletAccounts.items = data
      }).catch((error) =>{
        eWalletAccounts.isBusy = false
      })
    },
    getStudentBilling(billingId) {
      const { billing } = this.forms
      this.getBilling(billingId).then(({ data }) => {
        copyValue(data, billing.fields)
      })
    },
    onPaymentFileUpload(file) {
      const { evaluation } = this.forms
      let newFile = { id: null, name: file.name, notes: null, isBusy: true, file }
      this.paymentFiles.push(newFile)
      setTimeout(() => {
        newFile.isBusy = false
      }, 500);

    },
    onDeletePaymentFile(index) {
      this.paymentFiles.splice(index, 1)
    },
    onPaymentFileNavLeft() {
      const files = this.paymentFiles
      let currentIdx = this.paymentFiles.indexOf(this.lastActiveFile)
      const isFirst = currentIdx === 0;
      currentIdx = isFirst ? files.length - 1 : currentIdx - 1;
      const file = files[currentIdx];
      const currentFileItem = {
        ...this.lastActiveFile,
        index: currentIdx,
        item: file
      };
      this.previewPaymentFile(currentIdx);
    },
    onPaymentFileNavRight() {
      const files = this.paymentFiles
      let currentIdx = this.paymentFiles.indexOf(this.lastActiveFile)
      const isLast = currentIdx === files.length - 1;
      currentIdx = isLast ? 0 : currentIdx + 1;
      const file = files[currentIdx];
      const currentFileItem = {
        ...this.lastActiveFile,
        index: currentIdx,
        item: file
      };
      this.previewPaymentFile(currentIdx);
    },
    setupPaymentActiveFileViewer(index) {
      console.log(this.paymentFiles)
      this.lastActiveFile = this.paymentFiles[index]
      this.fileViewer.paymentFile.isActiveNavEnabled = true;
      this.fileViewer.paymentFile.activeNavCount = this.paymentFiles?.length;
      this.fileViewer.paymentFile.activeNavIndex =  index
      console.log(this.lastActiveFile)
    },
    previewPaymentFile(index) {
      this.setupPaymentActiveFileViewer(index)
      this.file.type = null
      this.file.src = null
      this.file.name = this.lastActiveFile?.name
      this.file.notes =  this.lastActiveFile?.notes
      this.file.isLoading = true
      this.fileViewer.paymentFile.show = true
      // this.file.owner = userable

      //load file on file viewer
      const reader = new FileReader();
      reader.onload = e => this.file.src = e.target.result
      reader.readAsDataURL(this.lastActiveFile.file);
      this.file.type = this.lastActiveFile.file.type
      this.file.isLoading = false
    },
    onSavePayment() {
      console.log('save payment')
      const { payment, billing } = this.forms

      const formData = new FormData();
      this.paymentFiles.forEach(paymentFile => {
        formData.append('file[]', paymentFile.file)
      });

      reset(payment)

      const data = {
        ...payment.fields
      }

      this.isProcessing = true
      this.addPayment(data).then(({ data }) => {
        const paymentId = data.id
        this.addPaymentFileMultiple(paymentId, formData).then(({ data }) => {
          this.$router.push('/statements')
          this.isProcessing = false
        }).catch((error) => {
          this.isProcessing = false
          showNotification(this, 'danger', 'Opps! Something went wrong on attachments.')
        })
      }).catch((error) => {
        const { errors } = error.response.data;
        showNotification(this, 'danger', 'Opps! Something went wrong, please verify your inputs.')
        validate(payment, errors);
        this.isProcessing = false
      });
    },
    getActiveSchoolYear() {
      const params = { paginate: false, isActive: 1 }
      this.getSchoolYearList(params).then(({ data }) => {
        if (data.length > 0) {
          this.activeSchoolYear = data[0]
        }
      })
    },
    onPaymentFileItemSelect(index) {
      const { paymentFile } = this.forms
      this.lastActiveFile = this.paymentFiles.length > 0 ? this.paymentFiles[index]: null
      paymentFile.fields.notes = this.lastActiveFile.notes
      this.showPaymentFileModal = true
    },
    onUpdatePaymentFile() {
      const { notes } = this.forms.paymentFile.fields
      this.isFileUpdating = true
      this.lastActiveFile.isBusy = true
      setTimeout(() => {
        this.lastActiveFile.notes = notes
        this.showPaymentFileModal = false
        this.lastActiveFile.isBusy = false
        this.isFileUpdating = false
      }, 300);
    }
  },
  created() {
    if (this.$route.params.billingId && isNaN(this.$route.params.billingId)) {
      this.$router.push('/statements')
      return
    }


    const studentId = this.$store?.state?.user?.id
    const billingId = this.$route?.params?.billingId
    const { payment, billing } = this.forms

    this.getStudentBilling(billingId)
    this.loadBankAccounts()
    this.loadEWalletAccounts()
    this.loadPeraPadalaAccounts()


    payment.fields.billingId = billingId
    payment.fields.studentId = studentId
    payment.fields.schoolYearId = this.activeSchoolYear?.id

  },
  computed: {
    getSignedRemainingBalance() {
      const { totalPaid, previousBalance, totalAmount } = this.forms.billing.fields
      const remainingBalance = (parseFloat(previousBalance) + parseFloat(totalAmount)) - parseFloat(totalPaid);
      if (isNaN(remainingBalance)) {
        return 0
      }

      if (Math.sign(remainingBalance) === -1){
        return `(${formatNumber(Math.abs(remainingBalance),2)})`
      }

      return formatNumber(remainingBalance,2)
    },
    getSignedPreviousBalance() {
      const { previousBalance } = this.forms.billing.fields
      if (isNaN(previousBalance)) {
        return 0
      }

      if (Math.sign(previousBalance) === -1){
        return `(${formatNumber(Math.abs(previousBalance),2)})`
      }

      return formatNumber(previousBalance,2);
    },
    getFormattedDueDate() {
      const { dueDate } = this.forms.billing.fields
      if(dueDate) {
        return format(new Date(dueDate), 'MMMM dd, yyyy')
      }
      return null
    }
  }
}
</script>

<style lang="scss">
  @import "../../../assets/scss/shared.scss";
  .payment__main-container {
    height: 100%;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    .payment-container {
      border: solid 1px whitesmoke;
      width: 700px;
      display: flex;
      flex-direction: column;
      padding: 0 30px;
    }

    @include for-size(phone-only) {
      .payment-container {
        width: 100%;
      }
    }

  }

  .billing-container {
    margin: 20px 0;
    border: solid 1px lightblue;
    border-radius: 3px ;
    padding: 15px 30px;
  }

  .payment-step__number {
    background-color: $blue;
    color: $white;
    height: 28px;
    width: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    border-radius: 50%;
    font-size: 16px;
    font-weight: 500;
  }

  .payment-step-header-container {
    display:flex;
    align-items: center;
  }

  .payment-step-details-container {
    display:flex;
    flex-direction: column;
    width: 100%;
  }

  .payment-step-container {
    display:flex;
    flex-direction: row;
    width: 100%;
  }

  .file-uploader-container {
    width: 100%;
    height: 250px;
    margin: 20px 0 20px 0;
    padding: 0 30px;
  }

  .file-item-container {
    width: 100%;
    height: auto;
    padding: 0 30px;
  }

  .application__action-bar {
    position: sticky;
    height: 60px;
    background-color: $white;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid $brand-border-color;
    z-index: 2;
  }

  .application__back-action {
    min-width: 140px;

    @include for-size(phone-only) {
      min-width: 80px;
    }
  }

  .application__main-action {
    margin-left: auto;
    min-width: 160px;

    @include for-size(phone-only) {
      min-width: 80px;
    }
  }

  .payment-form-container {
    border:1px dashed gray;
    padding: 20px;
    margin: 0 30px;
  }
</style>