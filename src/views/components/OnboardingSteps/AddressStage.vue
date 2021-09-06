<template>
  <div class="application__wizard-form">
    <div class="application__wizard-form-fields">
      <b-row>
        <b-col md=12>
          <h5>Current Address</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4">
          <b-form-group>
            <label class="required">House No/Street</label>
            <b-form-input
              v-model="forms.address.fields.currentHouseNoStreet"
              :state="forms.address.states.addressCurrentHouseNoStreet"
              debounce="500"/>
            <b-form-invalid-feedback>
              {{forms.address.errors.addressCurrentHouseNoStreet}}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label class="required">Barangay</label>
            <b-form-input
              v-model="forms.address.fields.currentBarangay" 
              :state="forms.address.states.addressCurrentBarangay" 
              debounce="500"/>
            <b-form-invalid-feedback>
              {{forms.address.errors.addressCurrentBarangay}}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label class="required">City/Town</label>
            <b-form-input
              v-model="forms.address.fields.currentCityTown" 
              :state="forms.address.states.addressCurrentCityTown" 
              debounce="500"/>
            <b-form-invalid-feedback>
              {{forms.address.errors.addressCurrentCityTown}}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4">
          <b-form-group>
            <label class="required">Province</label>
            <b-form-input
              v-model="forms.address.fields.currentProvince" 
              :state="forms.address.states.addressCurrentProvince" 
              debounce="500"/>
            <b-form-invalid-feedback>
              {{forms.address.errors.addressCurrentProvince}}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label class="required">Postal/Zip Code</label>
            <b-form-input
              v-model="forms.address.fields.currentPostalCode" 
              :state="forms.address.states.addressCurrentPostalCode" 
              debounce="500"/>
            <b-form-invalid-feedback>
              {{forms.address.errors.addressCurrentPostalCode}}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label >District</label>
            <b-form-input
              v-model="forms.address.fields.currentDistrict" 
              debounce="500"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="4">
          <b-form-group>
            <label>Region</label>
            <b-form-input
              v-model="forms.address.fields.currentRegion" 
              debounce="500"/>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label class="required">Country</label>
            <b-form-select 
              v-model="forms.address.fields.currentCountryId" 
              :state="forms.address.states.addressCurrentCountryId">
              <template v-slot:first>
                <b-form-select-option :value='null' disabled>--Select Country --</b-form-select-option>
              </template>
              <b-form-select-option v-for='country in options.countries.items.values' :key='country.id' :value='country.id'>
                {{country.name}}
              </b-form-select-option>
            </b-form-select>
            <b-form-invalid-feedback>
                {{forms.address.errors.addressCurrentCountryId}}
              </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label class="required">Home Landline/Mobile No.</label>
            <b-form-input
              v-model="forms.address.fields.currentHomeLandlineMobileNo"
              :state="forms.address.states.addressCurrentHomeLandlineMobileNo"
              debounce="500"/>
            <b-form-invalid-feedback>
              {{forms.address.errors.addressCurrentHomeLandlineMobileNo}}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-form-group>
            <label>Complete Address</label>
            <b-form-textarea
              rows="3"
              v-model="forms.address.fields.currentCompleteAddress"
              :state="forms.address.states.addressCurrentCompleteAddress"
              debounce="500"/>
            <b-form-invalid-feedback>
              {{forms.address.errors.addressCurrentCompleteAddress}}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md=12 >
          <!-- <b-form-checkbox @input="onSameAddress($event)">Same as Current Address</b-form-checkbox> -->
          <Toggle v-model="isSameAddress"/> <span class="ml-2">Permanent Address is same as Current Address</span>
        </b-col>
      </b-row>
      <template v-if="!isSameAddress">
        <hr>
        <b-row>
          <b-col md=6>
            <h5>Permanent Address</h5>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4">
            <b-form-group>
              <label class="required">House No/Street</label>
              <b-form-input
                v-model="forms.address.fields.permanentHouseNoStreet"
                :state="forms.address.states.addressPermanentHouseNoStreet"
                debounce="500"/>
              <b-form-invalid-feedback>
                {{forms.address.errors.addressPermanentHouseNoStreet}}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group>
              <label class="required">Barangay</label>
              <b-form-input
                v-model="forms.address.fields.permanentBarangay"
                :state="forms.address.states.addressPermanentBarangay"
                debounce="500"/>
              <b-form-invalid-feedback>
                {{forms.address.errors.addressPermanentBarangay}}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group>
              <label class="required">City/Town</label>
              <b-form-input
                v-model="forms.address.fields.permanentCityTown"
                :state="forms.address.states.addressPermanentCityTown"
                debounce="500"/>
              <b-form-invalid-feedback>
                {{forms.address.errors.addressPermanentCityTown}}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4">
            <b-form-group>
              <label class="required">Province</label>
              <b-form-input
                v-model="forms.address.fields.permanentProvince"
                :state="forms.address.states.addressPermanentProvince"
                debounce="500" />
              <b-form-invalid-feedback>
                {{forms.address.errors.addressPermanentProvince}}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group>
              <label class="required">Postal/Zip Code</label>
              <b-form-input
                v-model="forms.address.fields.permanentPostalCode"
                :state="forms.address.states.addressPermanentPostalCode"
                debounce="500" />
              <b-form-invalid-feedback>
                {{forms.address.errors.addressPermanentPostalCode}}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group>
              <label>District</label>
              <b-form-input
                v-model="forms.address.fields.permanentDistrict"
                debounce="500" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="4">
            <b-form-group>
              <label>Region</label>
              <b-form-input
                v-model="forms.address.fields.permanentRegion"
                debounce="500" />
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group>
              <label class="required">Country</label>
              <b-form-select
                v-model="forms.address.fields.permanentCountryId"
                :state="forms.address.states.addressPermanentCountryId">
                <template v-slot:first>
                  <b-form-select-option :value='null' disabled>--Select Contry --</b-form-select-option>
                </template>
                <b-form-select-option v-for='country in options.countries.items.values' :key='country.id' :value='country.id'>
                  {{country.name}}
                </b-form-select-option>
              </b-form-select>
              <b-form-invalid-feedback>
                  {{forms.address.errors.addressPermanentCountryId}}
                </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
          <b-col md="4">
            <b-form-group>
              <label class="required">Home Landline/Mobile No.</label>
              <b-form-input
                v-model="forms.address.fields.permanentHomeLandlineMobileNo" 
                :state="forms.address.states.addressPermanentHomeLandlineMobileNo"
                debounce="500" />
              <b-form-invalid-feedback>
                {{forms.address.errors.addressPermanentHomeLandlineMobileNo}}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <b-form-group>
              <label>Complete Address</label>
              <b-form-textarea
                rows="3"
                v-model="forms.address.fields.permanentCompleteAddress"
                :state="forms.address.states.addressPermanentCompleteAddress"
                debounce="500" />
              <b-form-invalid-feedback>
                {{forms.address.errors.addressPermanentCompleteAddress}}
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
      </template>
    </div>
    <div class="application__action-bar">
      <b-button
        @click="$emit('onBack', previousStepId)"
        variant="outline-secondary"
        class="application__back-action">
        Back
      </b-button>
      <b-button
        @click="onSubmitNext"
        variant="primary"
        class="application__main-action"
        :disabled="isProcessing">
        <v-icon
          v-if="isProcessing"
          name="sync"
          class="mr-2"
          spin />
          Next
      </b-button>
    </div>
  </div>
</template>
<script>
  import PhotoViewer from '../PhotoViewer'
  import { copyValue } from '../../../helpers/extractor';
  import { validate, reset } from '../../../helpers/forms';
  import Toggle from '../../components/Form/Toggle'
  import {
    StudentApi
  } from '../../../mixins/api';
  import {
    OnboardingSteps,
    Countries
  } from '../../../helpers/enum';

  const addressFields = {
    currentHouseNoStreet: null,
    currentBarangay: null,
    currentCityTown: null,
    currentProvince: null,
    currentRegion: null,
    currentDistrict: null,
    currentPostalCode: null,
    currentCountryId: Countries.PHILIPPINES.id,
    currentCompleteAddress: null,
    currentHomeLandlineMobileNo: null,
    permanentHouseNoStreet: null,
    permanentBarangay: null,
    permanentCityTown: null,
    permanentProvince: null,
    permanentRegion: null,
    permanentDistrict: null,
    permanentPostalCode: null,
    permanentCountryId: Countries.PHILIPPINES.id,
    permanentCompleteAddress: null,
    permanentHomeLandlineMobileNo: null
  }

  export default {
    mixins: [StudentApi],
    components: {
      PhotoViewer,
      Toggle
    },
    props: {
      data: {
        type: [Object]
      }
    },
    data() {
      return {
        isProcessing: false,
        previousStepId: OnboardingSteps.PROFILE.id,
        forms: {
          address: {
            fields: { ...addressFields },
            states: { ...addressFields },
            errors: { ...addressFields }
          }
        },
        options:{
          countries: {
            items: Countries
          },
        },
        isSameAddress: true
      }
    },
    created() {
      this.populate();
    },
    methods: {
      populate() {
        copyValue(this.data?.address || {}, this.forms.address.fields);
      },
      onSubmitNext() {
        this.isProcessing = true;

        const { address } = this.forms
        reset(address);
        const onboardingStepId = OnboardingSteps.FAMILY.id; // next step

        if (this.isSameAddress) {
          alert()
          address.fields.permanentHouseNoStreet = address.fields.currentHouseNoStreet
          address.fields.permanentBarangay = address.fields.currentBarangay
          address.fields.permanentCityTown = address.fields.currentCityTown
          address.fields.permanentProvince = address.fields.currentProvince
          address.fields.permanentRegion = address.fields.currentRegion
          address.fields.permanentDistrict = address.fields.currentDistrict
          address.fields.permanentPostalCode = address.fields.currentPostalCode
          address.fields.permanentCountryId = address.fields.currentCountryId
          address.fields.permanentCompleteAddress = address.fields.currentCompleteAddress
          address.fields.permanentHomeLandlineMobileNo = address.fields.currentHomeLandlineMobileNo
        }


        const payload = {
          onboardingStepId,
          address: {
            ...address?.fields
          }
        }
        this.updateStudent(payload, this.data?.id).then(({ data }) => {
          this.$emit('update:data', data);
          this.$emit('onAfterSubmit', onboardingStepId);
          this.isProcessing = false;
        }).catch((error) => {
          const { errors } = error.response.data;
          validate(this.forms.address, errors)
          this.isProcessing = false;
        });
      },
      // onSameAddress(isSame) {
      //   const { address: { fields: address } } = this.forms
      //   if (isSame) {
      //     address.permanentHouseNoStreet = address.currentHouseNoStreet
      //     address.permanentBarangay = address.currentBarangay
      //     address.permanentCityTown = address.currentCityTown
      //     address.permanentProvince = address.currentProvince
      //     address.permanentRegion = address.currentRegion
      //     address.permanentDistrict = address.currentDistrict
      //     address.permanentPostalCode = address.currentPostalCode
      //     address.permanentCountryId = address.currentCountryId
      //     address.permanentCompleteAddress = address.currentCompleteAddress
      //     address.permanentHomeLandlineMobileNo = address.currentHomeLandlineMobileNo
      //   } else {
      //     address.permanentHouseNoStreet = null
      //     address.permanentBarangay = null
      //     address.permanentCityTown = null
      //     address.permanentProvince = null
      //     address.permanentRegion = null
      //     address.permanentDistrict = null
      //     address.permanentPostalCode = null
      //     address.permanentCountryId = Countries.PHILIPPINES.id
      //     address.permanentCompleteAddress = null
      //     address.permanentHomeLandlineMobileNo = null
      //   }
      // },
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/shared.scss";

  .application__wizard-form-fields {
    margin-bottom: 20px;
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

