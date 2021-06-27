<template>
   <div class="application__wizard-form-fields">
      <b-row>
        <b-col md="12">
          <div v-if="currentStatusId === AcademicRecordStatuses.ENROLLED.id">
            <b-alert variant="success" show>
              <h5>CONGRATULATIONS!</h5>
              <p> Your are now officially enrolled and a certified Theresian. <br><br>
                You can download your Certificate of Registration 
                <a href="#" @click.prevent="onCompleteEnrollment('/documents/registration-list')">here</a>.<br>
                Note: Always bring it whenever you go within the school premises.<br><br>

                Accounting Department is now working for your Official Receipt.<br>
                Once available, you can download it <a href="#">here</a>. <br><br>

                Go to my <a href="#" @click="onCompleteEnrollment('/dashboard')">Dashboard</a>. <br>
                View my <a href="#" @click="onCompleteEnrollment('/documents/assessment-list')">Documents</a>. <br>
              </p>
              <!-- <small>Please, click here to complete your enrollment.</small> <b-button variant="outline-primary" @click="onCompleteEnrollment"> Click Here</b-button> -->
            </b-alert>
          </div>
          <div v-else>
            <b-alert variant="success" show>
              <h5>PAYMENT SUBMITTED !</h5>
              <p> Thank you for submitting your application for this school year.
              <br> We will review your payment and once approved, we will
              <br> notify you.
              <br>
              <br>We will try to get back to you as soon as we can!</p>
            </b-alert>
            <div class="approval-container">
              <ApprovalIndicator
                :stages="$options.paymentApprovalStages"
                :currentStage="selectedPaymentApprovalStage"
              />
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
</template>
<script>
  import ApprovalIndicator from '../ApprovalIndicator';
  import { paymentApprovalStages } from '../../../content';
  import { AcademicRecordStatuses } from '../../../helpers/enum';
import { StudentApi } from '../../../mixins/api';

  export default {
    paymentApprovalStages,
    components: {
      ApprovalIndicator
    },
    props: {
      data: {
        type: [Object]
      }
    },
    mixins: [ StudentApi ],
    data() {
      return {
        AcademicRecordStatuses,
        selectedPaymentApprovalStage: 1,
      }
    },
    computed: {
      currentStatusId() {
        return this.data?.latestAcademicRecord?.academicRecordStatusId;
      }
    },
    methods: {
      onCompleteEnrollment(routePath) {
        const data = { isOnboarding: false };
        this.updateStudent(data, this.data?.id).then(({ data }) => {
          this.$store.commit('SET_USER', data);
          this.$router.push({ path: routePath });
        })
      },
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


</style>

