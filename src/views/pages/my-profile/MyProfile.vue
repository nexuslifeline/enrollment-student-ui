<template>
  <div class="profile__main-container">
    <div class="profile__header">
      <div class="profile__photo-container">
        <div class="profile__frame">
          <PhotoViewer
            v-show="!!studentPhotoUrl"
            ref="photoViewer"
            @onPhotoChange="onPhotoChange"
            @onPhotoRemove="onPhotoRemove"
            :imageUrl="studentPhotoUrl"
            :isBusy="isProfilePhotoBusy"
          />
          <ProfileMaker
            v-if="!studentPhotoUrl"
            :initials="forms.student.fields.name ? `${forms.student.fields.firstName.charAt(0)}${forms.student.fields.lastName.charAt(0)}` : ''"
            :colorIndex="forms.student.fields.id ? forms.student.fields.id % 8 : 1" :fontSize="22"
          />
        </div>
        <b-button variant="outline-primary" class="change-photo-button" @click="onUploadClick">Change Photo</b-button>
      </div>
      <div class="profile__info-container">
        <p class="profile__name">{{ forms.student.fields.name }}</p>
          <div>
            <div >
            <label class="profile__label">Student No :</label> <span class="profile__info">{{ forms.student.fields.studentNo }}</span>
          </div>
          <div>
            <label class="profile__label">Address : </label>
            <span class="profile__info">
              {{ forms.student.fields.currentAddress }}
            </span>
          </div>
          <div>
            <label class="profile__label">Birthdate :</label> <span class="profile__info">{{ formattedBirthdate }}</span>
          </div>
          <div>
            <label class="profile__label">Mobile No :</label> <span class="profile__info">{{ forms.student.fields.mobileNo }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="profile__details">
      <div class="profile__details-left">
        <!-- <b-card no-body class="profile__details-card">
          <b-tabs pills card>
            <b-tab title="Personal" active><b-card-text>Personal</b-card-text></b-tab>
            <b-tab title="Address"><b-card-text>Address</b-card-text></b-tab>
            <b-tab title="Family"><b-card-text>Family</b-card-text></b-tab>
          </b-tabs>
        </b-card> -->
        <div class="profile__nav-container">
          <ul  class="profile__navs">
            <li @click="onNavSelected(idx)" v-for="(item, idx) in nav" :key="idx" :class="{ active: idx === selectedNavIndex }">{{ item }}</li>
          </ul>
        </div>
        <div v-if="selectedNavIndex === 0" class="nav-content" id="nav-content1">
          <div class="content-header personal">
            <div class="content-title">Personal Details</div>
            <div class="content-sub-title">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, aperiam?</div>
          </div>
          <b-row>
          <b-col md="8">
            <b-form-group>
              <label class="required">Firstname</label>
              <b-form-input
                v-model="forms.student.fields.firstName"
                :state="forms.student.states.firstName"
                debounce="500"/>
              <b-form-invalid-feedback>
                {{forms.student.errors.firstName}}
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
              <label>Middlename</label>
              <b-form-input
                v-model="forms.student.fields.middleName"
                debounce="500"/>
            </b-form-group>
            <b-form-group>
              <label class="required">Lastname</label>
              <b-form-input
                v-model="forms.student.fields.lastName"
                :state="forms.student.states.lastName"
                debounce="500"/>
              <b-form-invalid-feedback>
                {{forms.student.errors.lastName}}
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
              <label class="required">Birthdate</label>
              <b-form-input type="date"
                v-model="forms.student.fields.birthDate"
                :state="forms.student.states.birthDate" />
              <b-form-invalid-feedback>
                {{forms.student.errors.birthDate}}
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
              <label>Mobile No.</label>
              <b-form-input
                v-model="forms.student.fields.mobileNo"
                debounce="500"/>
            </b-form-group>
            <!-- <b-form-group>
              <label class="required">Civil Status</label>
              <b-form-select
                v-model="forms.student.fields.civilStatusId"
                :state="forms.student.states.civilStatusId" >
                <template v-slot:first>
                  <b-form-select-option :value='null' disabled>--Select Civil Status --</b-form-select-option>
                </template>
                <b-form-select-option v-for='civilStatus in options.civilStatuses.items.values' :key='civilStatus.id' :value='civilStatus.id'>
                  {{ civilStatus.name }}
                </b-form-select-option>
              </b-form-select>
              <b-form-invalid-feedback>
                {{ forms.student.errors.civilStatusId }}
              </b-form-invalid-feedback>
            </b-form-group> -->
          </b-col>
          </b-row>
          <div class="content-header address">
            <div class="content-title">Address</div>
            <div class="content-sub-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis ratione, beatae unde asperiores nemo.</div>
          </div>
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
          <hr>
          <b-row>
            <b-col md=6>
              <h5>Permanent Address</h5>
            </b-col>
            <b-col md=6 class="text-right">
              <b-form-checkbox @input="onSameAddress($event)">Same as Current Address</b-form-checkbox>
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
          <div class="content-header family">
            <div class="content-title">Family Details</div>
            <div class="content-sub-title">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, aperiam?</div>
          </div>
          <b-row>
            <b-col md=12>
              <b-row>
                <b-col md="6">
                  <b-form-group>
                    <label class="required">Father</label>
                    <b-form-input
                      v-model="forms.family.fields.fatherName"
                      :state="forms.family.states.familyFatherName"
                      debounce="500" />
                    <b-form-invalid-feedback>
                      {{forms.family.errors.familyFatherName}}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group>
                    <label>Contact No.</label>
                    <b-form-input
                      v-model="forms.family.fields.fatherMobileNo"
                      debounce="500" />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-group>
                    <label>Occupation</label>
                    <b-form-input
                      v-model="forms.family.fields.fatherOccupation"
                      debounce="500" />
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group>
                    <label>Email Address</label>
                    <b-form-input
                      v-model="forms.family.fields.fatherEmail"
                      :state="forms.family.states.familyFatherEmail"
                      debounce="500" />
                    <b-form-invalid-feedback>
                      {{forms.family.errors.familyFatherEmail}}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col md="6">
                  <b-form-group>
                    <label class="required">Mother</label>
                    <b-form-input
                      v-model="forms.family.fields.motherName"
                      :state="forms.family.states.familyMotherName"
                      debounce="500" />
                    <b-form-invalid-feedback>
                      {{forms.family.errors.familyMotherName}}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group>
                    <label>Contact No.</label>
                    <b-form-input
                      v-model="forms.family.fields.motherMobileNo"
                      debounce="500" />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
                  <b-form-group>
                    <label>Occupation</label>
                    <b-form-input
                      v-model="forms.family.fields.motherOccupation" 
                      debounce="500"/>
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group>
                    <label>Email Address</label>
                    <b-form-input
                      v-model="forms.family.fields.motherEmail"
                      :state="forms.family.states.familyMotherEmail"
                      debounce="500" />
                    <b-form-invalid-feedback>
                      {{forms.family.errors.familyMotherEmail}}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md=12>
                  <b-row>
                    <b-col md=12>
                      <h6>In case of emergency, Please contact : </h6>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="6">
                      <b-form-group>
                        <label class="required">Parent/Guardian</label>
                        <b-form-input 
                          v-model="forms.family.fields.parentGuardianName"
                          :state="forms.family.states.familyParentGuardianName" 
                          debounce="500"/>
                        <b-form-invalid-feedback>
                          {{forms.family.errors.familyParentGuardianName}}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                    <b-col md="6">
                      <b-form-group>
                        <label class="required">Parent/Guardian Contact No.</label>
                        <b-form-input 
                          v-model="forms.family.fields.parentGuardianContactNo"
                          :state="forms.family.states.familyParentGuardianContactNo" 
                          debounce="500"/>
                        <b-form-invalid-feedback>
                          {{forms.family.errors.familyParentGuardianContactNo}}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
        <div v-if="selectedNavIndex === 1" class="nav-content">
         <div class="content-header account">
            <div class="content-title">Account Details</div>
            <div class="content-sub-title">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, aperiam?</div>
          </div>
          <b-row>
            <b-col md=6>
              <b-form-group >
                <label class="required">Email</label>
                <b-form-input
                  ref="username"
                  v-model="forms.user.fields.username"
                  :state="forms.user.states.userUsername"
                  debounce="500" />
                <b-form-invalid-feedback>
                  {{forms.user.errors.userUsername}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md=6>
              <b-form-group >
                <label class="required">Password</label>
                <b-form-input
                  type="password"
                  v-model="forms.user.fields.password"
                  :state="forms.user.states.userPassword"
                  debounce="500" />
                <b-form-invalid-feedback>
                  {{forms.user.errors.userPassword}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col md=6>
              <b-form-group >
                <label class="required">Confirm Password</label>
                <b-form-input
                  type="password"
                  v-model="forms.user.fields.passwordConfirmation"
                  debounce="500"/>
              </b-form-group>
            </b-col>
          </b-row>

        </div>
        <div class="profile__action-bar">
          <b-button class="save-button" variant="outline-primary"
            :disabled="isProcessing"
            @click="onStudentUpdate()"
          >
            <v-icon
            v-if="isProcessing"
            name="sync"
            spin
            class="mr-2" />Save Changes</b-button>
        </div>
      </div>
      <b-card no-body class="profile__details-right">
      </b-card>
    </div>
  </div>
</template>

<script>

const studentFields = {
  id: null,
  studentNo: null,
  firstName: null,
  middleName: null,
  lastName: null,
  mobileNo: null,
  birthDate: null,
  civilStatusId: null,
  name: null,
  currentAddress: null,
  email: null,
}

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

const addressErrorFields = {
  addressCurrentHouseNoStreet: null,
  addressCurrentBarangay: null,
  addressCurrentCityTown: null,
  addressCurrentProvince: null,
  addressCurrentRegion: null,
  addressCurrentDistrict: null,
  addressCurrentPostalCode: null,
  addressCurrentCountryId: null,
  addressCurrentCompleteAddress: null,
  addressCurrentHomeLandlineMobileNo: null,
  addressPermanentHouseNoStreet: null,
  addressPermanentBarangay: null,
  addressPermanentCityTown: null,
  addressPermanentProvince: null,
  addressPermanentRegion: null,
  addressPermanentDistrict: null,
  addressPermanentPostalCode: null,
  addressPermanentCountryId: null,
  addressPermanentCompleteAddress: null,
  addressPermanentHomeLandlineMobileNo: null
}

const familyFields = {
  fatherName: null,
  fatherOccupation: null,
  fatherMobileNo: null,
  fatherEmail: null,
  motherName: null,
  motherOccupation: null,
  motherMobileNo: null,
  motherEmail: null,
  parentGuardianName: null,
  parentGuardianContactNo: null
}

const familyErrorFields = {
  familyFatherName: null,
  familyFatherOccupation: null,
  familyFatherMobileNo: null,
  familyFatherEmail: null,
  familyMotherName: null,
  familyMotherOccupation: null,
  familyMotherMobileNo: null,
  familyMotherEmail: null,
  familyParentGuardianName: null,
  familyParentGuardianContactNo: null
}

const userFields = {
  username: null,
  password: null,
  passwordConfirmation: null,
}

const userErrorFields = {
  userUsername: null,
  userPassword: null,
}

import { Countries } from "../../../helpers/enum";
import { validate, reset, showNotification, clear } from "../../../helpers/forms";
import { StudentApi } from '../../../mixins/api'
import { copyValue } from "../../../helpers/extractor";
import PhotoViewer from '../../components/PhotoViewer'
import ProfileMaker from '../../components/ProfileMaker'
import { format } from 'date-fns'


export default {
  name: 'MyProfile',
  mixins: [ StudentApi ],
  components: { PhotoViewer, ProfileMaker } ,
  data() {
    return {
      nav: [
        'Personal',
        'Account',
      ],
      selectedNavIndex: 0,
      Countries: Countries,
      studentPhotoUrl: null,
      isProfilePhotoBusy: false,
      isProcessing: false,
      forms: {
        student: {
          fields: { ...studentFields },
          states: { ...studentFields },
          errors: { ...studentFields }
        },
        address: {
          fields: { ...addressFields },
          states: { ...addressErrorFields },
          errors: { ...addressErrorFields }
        },
        family: {
          fields: { ...familyFields },
          states: { ...familyErrorFields },
          errors: { ...familyErrorFields }
        },
        user: {
          fields: { ...userFields },
          states: { ...userErrorFields },
          errors: { ...userErrorFields }
        },
      },
      options: {
        countries: {
          items: Countries
        },
      }
    }
  },
  created() {
    const studentId = this.$store.state.user.id;
     this.getStudent(studentId).then(({ data: student }) => {
       console.log(student)
      Object.keys(this.forms).forEach((key) => {
        const source = student[key] || student;
        if (source) {
          copyValue(source, this.forms[key].fields);
        }

        if(student.photo){
          this.studentPhotoUrl = process.env.VUE_APP_PUBLIC_PHOTO_URL + student.photo.hashName
        }

      })
     })
  },
  methods: {
    onNavSelected(idx) {
      this.selectedNavIndex = idx
    },
    onPhotoChange(file) {
      this.isProfilePhotoBusy = true
      const formData = new FormData();
      formData.append('photo', file);
      this.savePhoto(formData, this.forms.student.fields.id).then(({ data }) =>{
        this.studentPhotoUrl = process.env.VUE_APP_PUBLIC_PHOTO_URL + data.hashName
        localStorage.setItem('studentPhotoUrl', this.studentPhotoUrl);
        setTimeout(() => this.isProfilePhotoBusy = false, 3000)
      })
    },
    onPhotoRemove() {
      this.deletePhoto(this.forms.student.fields.id).then(({ data }) =>{
        this.studentPhotoUrl = ""
      })
    },
    onUploadClick(e) {
      this.$refs.photoViewer.onBrowseClick(e)
    },
    onStudentUpdate() {
      this.isProcessing = true
      const {
        student: { fields: { id: studentId } },
        student,
        address,
        family,
        user,
      } = this.forms;

      const formsToValidate = [
        student,
        address,
        family,
        user
      ]

      let payLoad = { }
      if (this.selectedNavIndex === 0) {
        //personal details
        payLoad = {
          ...student.fields,
          address: { ...address.fields },
          family: { ...family.fields },
        }
      }
      else if (this.selectedNavIndex === 1) {
        //personal details
        payLoad = {
          id: studentId,
          email: user.fields.username,
          user: { ...user.fields }
        }
      }

      formsToValidate.forEach(form => {
        if (form)
        reset(form)
      })

      this.updateStudent(payLoad, studentId).then(({ data }) => {


        copyValue(data, this.forms.student)
        copyValue(data.address, this.forms.address)
        copyValue(data.family, this.forms.family)
        copyValue(data.user, this.forms.user)

        showNotification(this, 'success', 'Changes has been saved.')
        this.forms.user.fields.password = null
        this.forms.user.fields.passwordConfirmation = null
        this.isProcessing = false
      }).catch((error) => {
        const { errors } = error.response.data;
        validate(this.forms.student, errors)
        validate(this.forms.address, errors)
        validate(this.forms.family, errors)
        validate(this.forms.user, errors)
        this.isProcessing = false;
        showNotification(this, 'danger', 'Please make sure all inputted data are correct.')
      });

    }
  },
  computed: {
    formattedBirthdate() {
      const { birthDate } = this.forms.student.fields
      if(birthDate)
      return format(new Date(birthDate), 'MMMM dd, yyyy')

      return ''
    },
    studentName() {
      return this.forms.student.fields.name
    }
  }
}
</script>

<style lang="scss" scoped>

    @import "../../../assets/scss/shared.scss";

  .profile__main-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgb(216, 209, 209);
    overflow: inherit;
  }

  .profile__header {
    height: 250px;
    // background-color:rgb(201, 238, 250);
    background-color: rgb(246, 242, 242);
    padding: 0 100px;
    display: flex;

    @include for-size(desktop-down) {
      padding: 0 20px;
    }

    @include for-size(phone-only) {
      height: auto;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
    }
  }

  .profile__photo-container {
    width: 250px;
    // border:solid 1px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .change-photo-button {
      margin-top: 20px;
      font-size: 7pt;
    }

    .profile__frame {
      display: inline-block;
      width: 150px;
      height: 150px;
      box-shadow: 0px 0px 1px 7px white;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
    }

    .profile__frame img {
      width: auto;
      height: 100%;
      // margin-left: -50px;
    }
  }

  .profile__info-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 40px;
    margin-left: 20px;
    color: rgb(52, 26, 172);
    width: 50%;

    .profile__name {
      font-size: 30pt;
      font-weight: bold;
    }


    @include for-size(tablet-landscape-down) {
      .profile__name {
        font-size: 20pt;
      }
    }

    @include for-size(phone-only) {
      width: 100%;
      align-items: center;

      .profile__name {
        text-align: center;
        font-size: 20pt;
      }
    }

  }

  .profile__label {
    width: 90px;
    color: rgb(52, 26, 172);;
  }

  .profile__info {
    color: rgb(52, 26, 172);;
  }

  .profile__details {
    flex: 1;
    padding: 40px 100px 20px;
    display: flex;

    .profile__details-left {
      width: 70%;
      display: flex;
      flex-direction: column;
      position: relative;

      .profile__nav-container {
        height: 45px;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: white;
        border-radius: 5px 5px 0 0;

        ul {
          display: flex;
          list-style-type: none;
          margin: 0;
          padding: 0;
          overflow: hidden;
          margin-left: 10px;
        }

        ul li {
          margin-right: 15px;
          width: calc(auto + 10px);
          text-align: center;
          color: lightgray;
          font-weight: bold;

          &:hover {
            cursor: pointer;
            color: black;
          }

          &.active {
            border-bottom: solid 4px rgb(82, 149, 172);
            color: black;
          }
        }
      }

      // .profile__details-card {
      //   height: 100%;
      // }
    }

    .profile__details-right {
      width: 30%;
      border: solid 1px lightgray;
      margin-left: 10px;
      height: 100%;
    }

    @include for-size(desktop-down) {
      .profile__details-right {
        display: none;
      }

      .profile__details-left {
        width: 100%;
      }
    }

    @include for-size(phone-only) {
      padding: 40px 20px 20px;

    }
  }

  .nav-content {
    flex: 1;
    background-color: white;
    margin-top: 5px;
    padding: 30px 50px ;
    max-height: calc(100vh - 200px);
    position: relative;
    height: 100vh;
    overflow-y: auto;
  }

  .nav-content::-webkit-scrollbar {
    width: 6px;
	  // background-color: #F5F5F5;
  }

  .nav-content::-webkit-scrollbar-track
  {
    // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    // border-radius: 10px;
    // background-color: #F5F5F5;
    display: none;
  }

 .nav-content::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    // -webkit-box-shadow: inset 0 0 6px rgba(221, 221, 221, 0.3);
    background-color: #46474b;
    height: 100px!important;
  }


  .content-header {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;
    // justify-content: center;
    // align-items: center;
    
    border-radius: 5px;
    padding: 10px 0 10px 10px;

    .content-title {
      font-size: 12pt;
      font-weight: bold;
      height: 100%;
      width: 100%;
      padding-top: 5px;

    }

    .content-sub-title {
      font-size: 10pt;
      height: 100%;
      width: 100%;
    }
  }

  .content-header.personal {
    background-color: rgb(201, 238, 250);
    color: rgb(52, 26, 172);
  }

  .content-header.address {
    background-color: rgb(246, 203, 175);
    color: rgb(187, 37, 10);
    margin-top: 20px;
  }

  .content-header.family {
    background-color: rgb(195, 250, 182);
    color: rgb(4, 116, 28);
    margin-top: 20px;
  }

  .content-header.account {
    background-color: rgb(203, 241, 250);
    color: rgb(9, 122, 167);
  }

  .profile__action-bar {
    position: sticky;
    bottom: 0;
    background-color: whitesmoke;
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: flex-end;

    .save-button {
      margin-right: 10px;
    }
  }

</style>