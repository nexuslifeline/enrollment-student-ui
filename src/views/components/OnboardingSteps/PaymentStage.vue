<template>
  <div class="application__wizard-form-fields">
    <b-row v-if="false">
      <b-col md=12>
        <b-alert variant="danger" show>
          <p>
            Sorry, your payment is rejected with the ffg. reasons : <br>
            {{ initialBill.studentFee && initialBill.studentFee.disapprovalNotes }} <br><br>
            <small>Please be inform that you can modify your payment and resubmit for activeEvaluation.</small>
          </p>
        </b-alert>
      </b-col>
    </b-row>
    <div v-show="!isPaying" class="mt-4" >
      <!--  -->
      <b-row >
        <b-col md=12>
          <b-row>
            <b-col md=12>
              <b-alert show variant="primary">
                <p>
                  The initial fee should be paid to secure you registration. You will not be officially registered unless payment procedure is completed.
                  <br>
                  <br>
                  <span v-if="initialBill.studentFee && initialBill.studentFee.approvalNotes">
                    IMPORTANT NOTICE:
                    <br>
                    {{ initialBill.studentFee.approvalNotes }}
                  </span>
                </p>
              </b-alert>
            </b-col>
          </b-row>
          <b-row class="mt-2">
            <b-col md=12>
              <b-card border-variant="warning">
                <b-row>
                  <b-col md=12>
                    <b-table
                      :fields="tables.billings.fields"
                      :items.sync="tables.billings.items"
                      borderless small responsive
                      :busy="tables.billings.isBusy" >
                      <template v-slot:table-busy>
                        <div class="text-center my-2">
                          <v-icon
                            name="spinner"
                            spin
                            class="mr-2" />
                          <strong>Loading...</strong>
                        </div>
                      </template>
                      <template v-slot:cell(action)>
                        <a href="#" @click.prevent="previewAssessmentForm">View Details</a>
                      </template>
                    </b-table>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col md=12>
                    <b-list-group  >
                      <b-list-group-item v-if="initialBill.totalAmount > 0" 
                        style="border:none;" href="#"
                        class="d-flex justify-content-between align-items-center" 
                        @click="onPaySelected(PayTypes.INITIAL.id)">
                        <div class="mr-4" style="color:black">
                          <h5 class="mb-1 mt-3">PAY {{ formattedInitialFeeValue }} PESOS ONLY</h5>
                          <p class="mb-2">
                            Make a payment for the initial fee only to be officially enrolled.
                          </p>
                        </div>
                        <v-icon name="greater-than" style="color:darkblue"></v-icon>
                      </b-list-group-item>
                      <b-list-group-item style="border:none;" href="#" class="d-flex justify-content-between align-items-center"
                        @click="onPaySelected(PayTypes.CUSTOM.id)">
                        <div class="mr-4" style="color:black">
                          <h5 class="mb-1 mt-3">PAY CUSTOM AMOUNT</h5>
                          <p class="mb-2">
                            Make a full or partial payment not less than the initial fee to be officially enrolled.
                          </p>
                        </div>
                        <v-icon name="greater-than" style="color:darkblue"></v-icon>
                      </b-list-group-item>
                      <b-list-group-item style="border:none;" href="#" class="d-flex justify-content-between align-items-center"
                        @click="onPaySelected(PayTypes.ATTACHMENT.id)">
                        <div class="mr-4" style="color:black">
                          <h5 class="mb-1 mt-3">ATTACH EXISTING RECEIPT</h5>
                          <p class="mb-2">
                            If you are already enrolled and have an Official Receipt or any Proof of Payment, or if you have a scholarship voucher, please attach them here, and once verified, you will be registered in the system.
                          </p>
                        </div>
                        <v-icon name="greater-than" style="color:darkblue"></v-icon>
                      </b-list-group-item>
                    </b-list-group>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </div>
    <div v-show="isPaying">
      <b-row>
        <b-col md=12>
          <b-card border-variant="warning">
            <b-alert show>
              <b-form-group>
                <b-form-radio-group
                  v-model="forms.payment.fields.paymentModeId"
                  stacked>
                  <b-form-radio
                    v-for="paymentMode in options.paymentModes.items"
                    :disabled="payTypeId === PayTypes.ATTACHMENT.id && payTypeId !== paymentMode.id"
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
          <h6>
            You have until {{ initialBill.dueDate }} to make the payment.
            This reference number will not be valid until that.
          </h6>
        </b-col>
      </b-row>
      <b-row class="mt-5">
        <b-col md=12>
          <div class="payment-step-container">
            <span class="payment-step__number">1</span>
            <div class="payment-step-details-container">
              <div v-if="payTypeId !== PayTypes.ATTACHMENT.id">
                <span v-if="forms.payment.fields.paymentModeId === 1">Choose your preferred bank.
                You can deposit/transfer your payment in any bank listed below.</span>
                <span v-if="forms.payment.fields.paymentModeId === 4">Choose your preferred Account.</span>
                <span v-if="forms.payment.fields.paymentModeId === 5">Choose your preferred Pera Padala provider.</span>
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
              <span v-if="payTypeId === PayTypes.ATTACHMENT.id || forms.payment.fields.paymentModeId === 3">Please attach any proof of your payment or your receipt provided by the St. Theresa College.</span>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col md=12>
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
              @onFileDrop="onPaymentFileUpload"
            />
          </div>
          <div class="file-item-container">
            <FileItem
              v-for="(item, index) of paymentFiles"
              :key="index"
              :title="item.name"
              :description="item.notes"
              :fileIndex="index"
              @onFileItemSelect="onPaymentFileItemSelect"
              @onFileItemRemove="onDeletePaymentFile"
              @onFileItemPreview="previewPaymentFile"
              :isBusy="item.isBusy"
            />
          </div>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col md=12>
          <div class="payment-step-container mb-3">
            <span class="payment-step__number">{{ forms.payment.fields.paymentModeId === 3 ? 2 : 3 }}</span>
            <div class="payment-step-details-container">
              <span>Enter the details of your proof of payment or deposit slip.</span>
            </div>
          </div>
          <div style="border:1px dashed gray; padding: 20px">
            <b-row>
              <b-col md=12>
                <b-row>
                  <b-col md=4>
                    <b-form-group>
                      <label>Enter amount you pay <v-icon name="info-circle" class="icon-tooltip" v-b-tooltip.hover="{ variant: 'info', title: toolTips.amount.title}"/></label>
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
                      <label>Transaction No <v-icon name="info-circle" class="icon-tooltip" v-b-tooltip.hover="{ variant: 'info', title: toolTips.transactionNo.title}"/></label>
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
                      <label>Date Paid 
                        <v-icon name="info-circle" class="icon-tooltip" v-b-tooltip.hover="{ variant: 'info', title: toolTips.datePaid.title}"/>
                      </label>
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
          <div class="mt-3">
            <b-button variant="danger" @click="isPaying=false">
              CANCEL
            </b-button>
          </div>
        </b-col>
      </b-row>
      <div class="application__action-bar">
        <b-button
          @click="onSubmitPayment"
          variant="primary"
          class="application__main-action"
          :disabled="isProcessing">
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
      :show="fileViewer.payment.show"
      :file="file"
      :owner="file.owner"
      :isBusy="file.isLoading"
      @close="fileViewer.payment.show = false"
      @onNavLeft="onPaymentFileNavLeft"
      @onNavRight="onPaymentFileNavRight"
      :navCount="fileViewer.payment.activeNavCount"
      :navActiveIndex="fileViewer.payment.activeNavIndex"
      :enableArrowNav="fileViewer.payment.isActiveNavEnabled"
    />
    <FileViewer
      :show="isShownAssessment"
      :file="file"
      :owner="file.owner"
      :isBusy="file.isLoading"
      @close="isShownAssessment = false"
    />
  </div>
</template>
<script>
  import FileViewer  from '../FileViewer';
  import  FileUploader from '../FileUploader'
  import  FileItem from '../FileItem'
  import {
    AcademicRecordStatuses,
    PaymentStatuses,
    BillingTypes,
    PayTypes,
    OnboardingSteps
  } from '../../../helpers/enum';
  import { paymentMethods, paymentTooltips } from '../../../content';
  import { validate, reset, formatNumber, showNotification } from '../../../helpers/forms';

  import {
    AcademicRecordApi,
    EWalletAccountApi,
    BankAccountApi,
    PeraPadalaAccountApi,
    PaymentFileApi,
    ReportApi,
    PaymentApi
  } from '../../../mixins/api';
import { copyValue } from '../../../helpers/extractor';

  // const billingFields = {
  //   id: null,
  //   billingNo: null,
  //   dueDate: null,
  //   totalAmount: null
  // }

  const paymentFields = {
    id: null,
    transactionNo: null,
    amount: 0,
    datePaid: null,
    paymentModeId: 1,
    notes: null,
    paymentStatusId: PaymentStatuses.PENDING.id,
    disapprovalNotes: null,
    // submittedDate: null,
    // schoolYearId: null,
  }

  const paymentErrorFields = {
    transactionNo: null,
    amount: null,
    datePaid: null,
    paymentModeId: 1,
    notes: null
  }

  const paymentFileFields = {
    id: null,
    notes: null
  }

  export default {
    mixins: [
      AcademicRecordApi,
      EWalletAccountApi,
      BankAccountApi,
      PeraPadalaAccountApi,
      PaymentFileApi,
      ReportApi,
      PaymentApi
    ],
    components: {
      FileUploader,
      FileItem,
      FileViewer
    },
    props: {
      data: {
        type: [Object]
      }
    },
    data() {
      return {
        OnboardingSteps,
        isProcessing: false,
        isShownAssessment: false,
        file: {
          type: null,
          src: null,
          name: null,
          notes: null,
          isLoading: false
        },
        fileViewer: {
          payment: {
            isActiveNavEnabled: false,
            activeNavCount: 0,
            activeNavIndex: 0,
            show: false,
          }
        },
        toolTips: { ...paymentTooltips },
        payTypeId: null,
        initialBill: {},
        paymentFiles: [],
        BillingTypes,
        PayTypes,
        PaymentStatuses,
        isPaying: false,
        selectedPaymentModeId: 1,
        tables: {
          billings: {
            isBusy: false,
            fields: [
              {
                key: "billingNo",
                label: "Billing No",
                tdClass: "align-middle",
                thStyle: { width: "auto" }
              },
              {
                key: "dueDate",
                label: "Date",
                tdClass: "align-middle",
                thStyle: { width: "15%" }
              },
              {
                key: "studentFee.totalAmount",
                label: "Total Fees",
                tdClass: "align-middle text-right",
                thClass: "align-middle text-right",
                thStyle: { width: "15%" },
                formatter: (value) => {
                  return formatNumber(value)
                }
              },
              {
                key: "totalAmount",
                label: "Initial Fee",
                tdClass: "align-middle text-right",
                thClass: "align-middle text-right",
                thStyle: { width: "15%" },
                formatter: (value) => {
                  return formatNumber(value)
                }
              },
              {
                key: "previousBalance",
                label: "Previous Balance",
                tdClass: "align-middle text-right",
                thClass: "align-middle text-right",
                thStyle: { width: "20%" },
                formatter: (value) => {
                  return formatNumber(value)
                }
              },
              {
                key: "action",
                label: "",
                tdClass: "align-middle text-right",
                thClass: "align-middle text-right",
                thStyle: { width: "100px" }
              }
            ],
            items: []
          },
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
        forms: {
          // billing: {
          //   fields: { ...billingFields },
          //   states: { ...billingFields },
          //   errors: { ...billingFields }
          // },
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
    created() {
      // Note! add an improvement that will check initial billing
      // if there is no initial billing found, add a message saying that you need to submit an Assessment Request first
      // when click will go back to Assessment Request Stage
      this.loadInitialBilling();
      this.loadBankAccounts();
      this.loadPeraPadalaAccounts();
      this.loadEWalletAccounts();
    },
    methods: {
      setDefaultData(data) {
        if (!!data?.payments?.length) {
          // we expect to have atleast a draft payment at this time since approve-assessment will create a draft payment record
          copyValue(data.payments?.[0], this.forms.payment.fields);
          this.loadPaymentFiles(); // this is temporry only, will be moved to separate component for handle payment files
        } else {
          // create a draft payment here if no there is no current draft payment
          showNotification(
            this,
            'danger',
            `Something went wrong due to Draft Payment not found. Brace yourself till we fix this issue or you may reload the page. `,
            'Error'
          );
        }
      },
      loadInitialBilling() {
        this.getInitialBilling(this.data?.activeAcademicRecord?.id).then(({ data }) => {
          this.initialBill = data;
          this.tables.billings.items = [data];
          this.setDefaultData(data);
        }).catch((error) => {

        });
      },
      loadPaymentFiles() {
        this.getPaymentFiles(this.forms?.payment?.fields?.id).then(({ data }) => {
          data.data.forEach(file => {
            this.paymentFiles.push({
              id: file.id,
              name: file.name,
              notes: file.notes,
              isBusy: false
            })
          })
        });
      },
      onPaySelected(payTypeId) {
        this.payTypeId = payTypeId
        this.isPaying = true;
        // if payment is null add payment
        if (payTypeId === PayTypes.ATTACHMENT.id) {
          this.forms.payment.fields.paymentModeId = 3
        } else {
          this.forms.payment.fields.paymentModeId = 1
        }

        // const {
        //   payment,
        //   // billing,
        //   // billing: { fields: { id: billingId } },
        //   // student: { fields: { id: studentId } },
        // } = this.forms

        // reset(payment)

        // payment.fields.schoolYearId = this.activeSchoolYear?.id
        // const { transactionNo, amount, datePaid } = this.forms.payment
        // const data = {
        //   ...payment.fields,
        //   transactionNo,
        //   amount,
        //   datePaid,
        //   billingId,
        //   studentId,
        // }
        // this.isPaying = true

        if (payTypeId === PayTypes.INITIAL.id) {
          this.forms.payment.fields.amount = initialBill.totalAmount
        } else {
          this.forms.payment.fields.amount = 0
        }

        // if (payment.fields.id === null) {
        //   this.addPayment(data).then(({ data }) =>{
        //     copyValue(data, payment)
        //     payment.fields.id = data.id
        //   }).catch((error) => {
        //     const { errors } = error.response.data;
        //     validate(payment, errors);
        //   });
        // }
      },
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
      onPaymentFileUpload(file) {
        const formData = new FormData();
        const { payment } = this.forms

        if (!payment.fields.id) {
          // NOTE! all string messages should be move to contents
          showNotification(this, 'danger', `Something went wrong. Brace yourself till we fix this issue or you may reload the page. `, 'Error')
          return;
        }

        formData.append('file', file);
        this.paymentFiles.push({ id: null, name: null, notes: null, isBusy: true })
        let newFileIndex = this.paymentFiles.length - 1
        let newFile = this.paymentFiles[newFileIndex]
        this.addPaymentFile(formData, payment.fields.id).then(({ data }) =>{
          newFile.id = data.id
          newFile.name = data.name
          newFile.isBusy = false
          this.onPaymentFileItemSelect(newFileIndex)
        }).catch((error) => {
          // NOTE! all string messages should be move to contents
          showNotification(this, 'danger', `Error occured while uploadig file. Brace yourself till we fix this issue or you may try again.`, 'Error')
          this.paymentFiles = this.paymentFiles.filter(({ id }) => !!id); // remove items with null values
        });
      },
      onPaymentFileItemSelect(idx) {
        const { paymentFile } = this.forms
        reset(paymentFile)
        this.selectedPaymentFileIndex = idx

        paymentFile.fields.id = this.paymentFiles[idx].id
        paymentFile.fields.notes = this.paymentFiles[idx].notes

        this.showPaymentFileModal = true
      },
      onSubmitPaymentFile () {
        const { payment: { fields:{ id: paymentId } }, paymentFile } = this.forms

        const selectedFile = this.paymentFiles[this.selectedPaymentFileIndex]
        this.isFileUpdating = true
        selectedFile.isBusy = true
        this.updatePaymentFile(paymentFile.fields, paymentId, paymentFile.fields.id).then(({ data }) => {
          selectedFile.notes = data.notes;
          this.isFileUpdating = false
          this.showPaymentFileModal = false;
          setTimeout(() => selectedFile.isBusy = false, 1000);
        }).catch((error) => {
          const { errors } = error.response.data;
          validate(paymentFile, errors);
          this.isFileUpdating = false
          selectedFile.isBusy = false
        });
      },
      onDeletePaymentFile (index) {
        const { payment: { fields:{ id: paymentId } } } = this.forms

        const selectedFile = this.paymentFiles[index]
        this.isFileDeleting = true
        selectedFile.isBusy = true
        this.deletePaymentFile(paymentId, selectedFile.id).then(()=> {
          this.isFileDeleting = false
          this.showPaymentFileModal = false
          this.paymentFiles.splice(index, 1);
        }).catch((error) => {
          this.isFileDeleting = false
          selectedFile.isBusy = false
        });
      },
      setupPaymentActiveFileViewer(index) {
        this.lastActiveFile = this.paymentFiles[index]
        this.fileViewer.payment.isActiveNavEnabled = this.paymentFiles?.length > 1;
        this.fileViewer.payment.activeNavCount = this.paymentFiles?.length;
        this.fileViewer.payment.activeNavIndex =  index
      },
      previewPaymentFile(index) {
        this.setupPaymentActiveFileViewer(index)
        const { payment: { fields:{ id: paymentId } } } = this.forms
        const selectedFile = this.paymentFiles[index]
        this.file.type = null
        this.file.src = null
        this.file.name = selectedFile?.name
        this.file.notes = selectedFile?.notes
        this.file.isLoading = true
        this.file.owner = {}
        this.fileViewer.payment.show = true

        this.getPaymentFilePreview(paymentId, selectedFile.id)
          .then(response => {
            this.file.type = response.headers.contentType
            const file = new Blob([response.data], { type: response.headers.contentType })
            const reader = new FileReader();
            reader.onload = e => this.file.src = e.target.result
            reader.readAsDataURL(file);
            this.file.isLoading = false
          })
      },
      onPaymentFileNavLeft() {
        const files = this.paymentFiles;
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
        const files = this.paymentFiles;
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
      previewAssessmentForm(){
        const academicRecordId = this.data?.activeAcademicRecord?.id;
        this.file.type = null
        this.file.src = null
        this.file.notes = null
        this.file.isLoading = true
        this.file.owner = {};
        this.file.name = 'Assessment Form'

        this.isShownAssessment = true
        this.getAssessmentFormPreview(academicRecordId)
          .then(response => {
            this.file.type = response.headers.contentType
            const file = new Blob([response.data], { type: "application/pdf" } )
            const reader = new FileReader();
            reader.onload = e => this.file.src = e.target.result
            reader.readAsDataURL(file);
            this.file.isLoading = false
        })
      },
      onSubmitPayment() {
        this.isProcessing = true;
        reset(this.forms.payment);
        const onboardingStepId = OnboardingSteps.WAITING.id; // next step
        const payload = {
          ...this.forms.payment?.fields
        }
        this.postSubmitPayment(payload, this.forms.payment?.fields?.id).then(({ data }) => {
          this.$emit('update:data', data);
          this.$emit('onAfterSubmit', onboardingStepId);
          this.isProcessing = false;
        }).catch((error) => {
          const { errors } = error.response.data;
          validate(this.forms.payment, errors)
          this.isProcessing = false;
        });
      },
    },
    computed: {
      currentStatusId() {
        return this.data?.activeAcademicRecord?.academicRecordStatusId;
      },
      // initialBill() {
      //   const bills = this.data?.activeAcademicRecord?.studentFee?.billings || [];
      //   return bills.find((v) => v.billTypeId === BillingTypes.INITIAL.id) || {};
      // }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/shared.scss";

  .application__wizard-form-fields {
    margin-bottom: 20px;
    width: 85%;
    max-width: 750px;
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

  .profile-photo {
    height: 200px;
    width: 200px;
  }

  .profile-photo-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .application__wizard-form {
    padding: 30px 15px 50px 15px;
    width: 100%;
    max-width: 950px;
    margin: 25px 10px 20px 10px;
    background-color: $white;
    margin-bottom: 100px;

    @include for-size(tablet-portrait-down) {
      margin: 0 0 50px 0;
      border: none;
    }

    @include for-size(desktop-up) {
      padding: 20px 60px 60px 60px;
    }
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

  .application__wizard-form-fields {
    margin-bottom: 20px;
  }

  .item + .item:before {
    content: " | ";
  }

  .icon-tooltip {
    height: 14px;
    width: 14px;
    color: rgb(68, 185, 224);
    margin: 0 0 2px 5px;
  }

  .file-uploader-container {
    width: 100%;
    height: 250px;
    margin: 20px 0 20px 0;
  }

  .file-item-container {
    width: 100%;
    height: auto;
  }


</style>

