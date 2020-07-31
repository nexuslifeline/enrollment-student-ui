<template>
  <div class="application__container">
    <div class="application__pane">
      <div class="application__left-pane">
        <GroupStageIndicator
          :stages="groupStages"
          :activeId="forms.activeApplication.fields.applicationStepId"
        />
      </div>
      <div class="application__main-pane">
        <div class="application__wizard-form">
          <h4 class="application__form-title">{{heading && heading.subHeader}}</h4>
          <p class="application__form-description">{{heading && heading.description}}</p>
          <div v-show="forms.activeApplication.fields.applicationStepId === ApplicationSteps.PROFILE.id">
            <b-row class="mt-4">
              <b-col md="6">
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
              </b-col>
              <b-col md="6">
                <div class="profile-photo-container">
                  <div class="profile-photo">
                    <PhotoViewer
                      @onPhotoChange="onPhotoChange"
                      @onPhotoRemove="onPhotoRemove"
                      :imageUrl="studentPhotoUrl"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label class="required">Birthdate</label>
                  <b-form-input type="date" 
                    v-model="forms.student.fields.birthDate" 
                    :state="forms.student.states.birthDate" />
                  <b-form-invalid-feedback>
                    {{forms.student.errors.birthDate}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label>Mobile No.</label>
                  <b-form-input
                    v-model="forms.student.fields.mobileNo" 
                    debounce="500"/>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
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
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <div v-show="forms.activeApplication.fields.applicationStepId === ApplicationSteps.ADDRESS.id">
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
          </div>
          <div v-show="forms.activeApplication.fields.applicationStepId === ApplicationSteps.FAMILY.id">
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
          </div>
          <div v-show="forms.activeApplication.fields.applicationStepId === ApplicationSteps.EDUCATION.id">
            <b-row>
              <b-col md="5">
                <b-form-group>
                  <label>Last School Attended</label>
                  <b-form-input
                    v-model="forms.education.fields.lastSchoolAttended" 
                    debounce="500"/>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group>
                  <label>From</label>
                  <b-form-input
                    v-model="forms.education.fields.lastSchoolYearFrom" 
                    debounce="500"/>
                </b-form-group>
              </b-col>
               <b-col md="2">
                <b-form-group>
                  <label>To</label>
                  <b-form-input
                    v-model="forms.education.fields.lastSchoolYearTo" 
                    debounce="500"/>
                </b-form-group>
              </b-col>
              <b-col md="3">
                <b-form-group>
                  <label>Level</label>
                  <b-form-input
                    v-model="forms.education.fields.lastLevel" 
                    debounce="500"/>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-form-group>
                  <label>Last School Address</label>
                  <b-form-input
                    v-model="forms.education.fields.lastSchoolAddress"
                    debounce="500" />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-row>
                  <b-col md="5">
                    <b-form-group>
                      <label>Elementary or Primary</label>
                      <b-form-input
                          v-model="forms.education.fields.elementaryCourse" 
                          debounce="500"/>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group>
                      <label>From</label>
                      <b-form-input
                          v-model="forms.education.fields.elementaryCourseYearFrom"
                          debounce="500" />
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group>
                      <label>To</label>
                      <b-form-input
                          v-model="forms.education.fields.elementaryCourseYearTo"
                          debounce="500" />
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group>
                      <label>Honor Received</label>
                      <b-form-input
                          v-model="forms.education.fields.elementaryCourseHonors"
                          debounce="500"/>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-row>
                  <b-col md="5">
                    <b-form-group>
                      <label>High School or Secondary</label>
                      <b-form-input
                          v-model="forms.education.fields.highSchoolCourse"
                          debounce="500"/>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group>
                      <label>From</label>
                      <b-form-input
                          v-model="forms.education.fields.highSchoolCourseYearFrom"
                          debounce="500"/>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group>
                      <label>To</label>
                      <b-form-input
                          v-model="forms.education.fields.highSchoolCourseYearTo"
                          debounce="500"/>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group>
                      <label>Honor Received</label>
                      <b-form-input
                          v-model="forms.education.fields.highSchoolCourseHonors"
                          debounce="500"/>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-row>
                  <b-col md="5">
                    <b-form-group>
                      <label>Senior School or Upper Secondary</label>
                      <b-form-input
                          v-model="forms.education.fields.seniorSchoolCourse"
                          debounce="500"/>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group>
                      <label>From</label>
                      <b-form-input
                          v-model="forms.education.fields.seniorSchoolCourseYearFrom"
                          debounce="500"/>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group>
                      <label>To</label>
                      <b-form-input
                          v-model="forms.education.fields.seniorSchoolCourseYearTo"
                          debounce="500"/>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group>
                      <label>Honor Received</label>
                      <b-form-input
                          v-model="forms.education.fields.seniorSchoolCourseHonors"
                          debounce="500"/>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-row>
                  <b-col md="5">
                    <b-form-group>
                      <label >College Degree(if graduated) or Tertiary</label>
                      <b-form-input
                          v-model="forms.education.fields.collegeDegree"
                          debounce="500"/>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group>
                      <label>From</label>
                      <b-form-input
                          v-model="forms.education.fields.collegeDegreeYearFrom"
                          debounce="500"/>
                    </b-form-group>
                  </b-col>
                  <b-col md="2">
                    <b-form-group>
                      <label>To</label>
                      <b-form-input
                          v-model="forms.education.fields.collegeDegreeYearTo"
                          debounce="500"/>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group>
                      <label>Honor Received</label>
                      <b-form-input
                          v-model="forms.education.fields.collegeDegreeHonors"
                          debounce="500"/>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
          <div v-show="forms.activeApplication.fields.applicationStepId === ApplicationSteps.REQUEST_EVALUATION.id">
            <b-row v-if="forms.evaluation.fields.evaluationStatusId === EvaluationStatuses.REJECTED.id">
              <b-col md=12>
                <b-alert variant="danger" show>
                  <p>
                    <strong>
                      Sorry, your request for evaluation is rejected with the ffg. reasons : <br>
                      {{ forms.evaluation.fields.disapprovalNotes }} <br><br>
                    </strong>
                    <small>Please be inform that you can modify your request and resubmit for evaluation.</small>
                  </p>
                </b-alert>
              </b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col md=12 >
                <h5>
                  1. Your previous academic details.
                </h5>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="5">
                <b-form-group>
                  <label class="required">Last School Attended</label>
                  <b-form-input
                    v-model="forms.evaluation.fields.lastSchoolAttended" 
                    :state="forms.evaluation.states.evaluationLastSchoolAttended"
                    debounce="500"/>
                  <b-form-invalid-feedback>
                    {{ forms.evaluation.errors.evaluationLastSchoolAttended }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group>
                  <label class="required">From</label>
                  <b-form-input
                    v-model="forms.evaluation.fields.lastSchoolYearFrom" 
                    :state="forms.evaluation.states.evaluationLastSchoolYearFrom"
                    debounce="500" />
                  <b-form-invalid-feedback>
                    {{ forms.evaluation.errors.evaluationLastSchoolYearFrom }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="2">
                <b-form-group>
                  <label class="required">To</label>
                  <b-form-input
                    v-model="forms.evaluation.fields.lastSchoolYearTo" 
                    :state="forms.evaluation.states.evaluationLastSchoolYearTo"
                    debounce="500" />
                  <b-form-invalid-feedback>
                    {{ forms.evaluation.errors.evaluationLastSchoolYearTo }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="3" v-if="forms.evaluation.fields.studentCategoryId === StudentCategories.OLD.id">
                <b-form-group>
                  <label class="required">Enrolled Year</label>
                  <b-form-input
                    v-model="forms.evaluation.fields.enrolledYear" 
                    :state="forms.evaluation.states.evaluationEnrolledYear"
                    type="number"
                    debounce="500"/>
                  <b-form-invalid-feedback>
                    {{ forms.evaluation.errors.evaluationEnrolledYear }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-form-group>
                  <label>Notes</label>
                  <b-form-textarea
                    rows="2"
                    v-model="forms.evaluation.fields.notes"
                    debounce="500"/>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mb-2 mt-2">
              <b-col md=12>
                <h5>
                  2. Your school level to enroll.
                </h5>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label class="required">Level</label>
                  <b-form-select
                    @input="loadCourses()"
                    v-model='forms.evaluation.fields.levelId'
                    :state="forms.evaluation.states.evaluationLevelId">
                    <template v-slot:first>
                      <b-form-select-option :value='null' disabled>-- Level --</b-form-select-option>
                    </template>
                    <b-form-select-option v-for='level in options.levels.items' :key='level.id' :value='level.id'>
                      {{ level.name }}
                    </b-form-select-option>
                  </b-form-select>
                  <b-form-invalid-feedback>
                    {{ forms.evaluation.errors.evaluationLevelId }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group v-if="forms.evaluation.fields.schoolCategoryId === SchoolCategories.SENIOR_HIGH_SCHOOL.id || 
                    forms.evaluation.fields.schoolCategoryId === SchoolCategories.COLLEGE.id ||
                      forms.evaluation.fields.schoolCategoryId === SchoolCategories.GRADUATE_SCHOOL.id ||
                        forms.evaluation.fields.schoolCategoryId === SchoolCategories.VOCATIONAL.id">
                  <label class="required">Course</label>
                  <b-form-select
                    v-model='forms.evaluation.fields.courseId'
                    :state="forms.evaluation.states.evaluationCourseId"
                    >
                    <!-- :state="forms.transcript.states.transcriptCourseId" -->
                    <template v-slot:first>
                      <b-form-select-option :value='null' disabled>-- Course --</b-form-select-option>
                    </template>
                    <b-form-select-option v-for='course in options.courses.items' :key='course.id' :value='course.id'>
                      {{ course.description }} {{ course.major ? `(${ course.major })` : ''}}
                    </b-form-select-option>
                  </b-form-select>
                  <b-form-invalid-feedback>
                    {{ forms.evaluation.errors.evaluationCourseId }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group v-if="forms.evaluation.fields.schoolCategoryId === SchoolCategories.SENIOR_HIGH_SCHOOL.id || 
                    forms.evaluation.fields.schoolCategoryId === SchoolCategories.COLLEGE.id">
                  <label>Semester</label>
                  <b-form-select
                    v-model='forms.evaluation.fields.semesterId'
                    :state="forms.evaluation.states.evaluationSemesterId">
                    <template v-slot:first>
                      <b-form-select-option :value='null' disabled>-- Semester --</b-form-select-option>
                    </template>
                    <b-form-select-option v-for='semester in options.semesters.items.values' :key='semester.id' :value='semester.id'>
                      {{ semester.name }}
                    </b-form-select-option>
                  </b-form-select>
                  <b-form-invalid-feedback>
                    {{forms.evaluation.errors.evaluationSemesterId}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col md=12>
                <h5>
                  3. Attachment of supporting documents.
                </h5>
                <p class="ml-3">
                  <small>
                    Upon submitting this form, the details you provided in the system will be examined and are subject for approval by the registrar's office. <br>
                    In order for this application to be approved and proceed to the next phase of the enrollment process, Please upload your complete enrollment requirements. <br>
                    You can get full list of your complete enrollment requirements <a href="#" @click="previewRequirementList()">here</a>.
                  </small>
                </p>
              </b-col>
            </b-row>
            <b-row>
              <b-col md=12>
                <div class="file-uploader-container">
                  <FileUploader
                    @onFileChange="onEvaluationFileUpload" 
                    @onFileDrop="onEvaluationFileUpload"
                  />
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col md=12>
                <div class="file-item-container">
                  <FileItem
                    v-for="(item, index) of evaluationFiles"
                    :key="index"
                    :title="item.name"
                    :description="item.notes"
                    :fileIndex="index"
                    @onFileItemSelect="onEvaluationFileItemSelect"
                    @onFileItemRemove="onDeleteEvaluationFile"
                    @onFileItemPreview="previewEvaluationFile"
                    :isBusy="item.isBusy"
                  />
                </div>
              </b-col>
            </b-row>
          </div>
          <div v-show="forms.activeApplication.fields.applicationStepId === ApplicationSteps.WAITING_EVALUATION.id">
            <div>
              <b-alert variant="success" show>
                <h5>REQUEST FOR EVALUATION SUBMITTED !</h5>
                <p> Thank you for submitting your application for this school year. 
                <br> We will review your payment and once approved, we will
                <br> notify you.
                <br>
                <br>We will try to get back to you as soon as we can!</p>
              </b-alert>
              <div class="approval-container">
                <ApprovalIndicator
                  :stages="evaluationApprovalStages"
                  :currentStage="selectedEvaluationApprovalStage"
                />
              </div>
              <b-alert
                  :show="evaluationDismissCountDown"
                  variant="info"
                  @dismissed="onUpdateStudent()"
                  @dismiss-count-down="evaluationCountDownChanged"
                >
                  Please wait a few second, we are setting up for you. Time remaining: {{ evaluationDismissCountDown  }} second(s).
                  <v-icon
                    v-if="evaluationDismissCountDown"
                    name="spinner"
                    class="mr-2 float-right"
                    spin />
                </b-alert>
            </div>
          </div>
          <div v-show="forms.activeApplication.fields.applicationStepId === ApplicationSteps.ACADEMIC_YEAR_APPLICATION.id">
            <b-row v-if="forms.activeApplication.fields.applicationStatusId === ApplicationStatuses.REJECTED.id">
              <b-col md=12>
                <b-alert variant="danger" show>
                  <p style="font-weight:bold">
                    Sorry, your application is rejected with the ffg. reasons : <br>
                    {{ this.forms.activeApplication.fields.disapprovalNotes }} <br><br>
                    <small>Please be inform that you can modify your application and resubmit for evaluation.</small>
                  </p>
                </b-alert>
              </b-col>
            </b-row>
            <b-row>
                <b-col md=12>
                  <b-card border-variant="primary">
                    <b-row>
                      <b-col md="6">
                        <b-form-group>
                          <label>Level</label>
                          <br>
                          <label class="font-weight-bold">{{ getSelectedEvaluationLevel }} </label>
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group v-if="forms.evaluation.fields.schoolCategoryId === SchoolCategories.SENIOR_HIGH_SCHOOL.id || 
                          forms.evaluation.fields.schoolCategoryId === SchoolCategories.COLLEGE.id ||
                            forms.evaluation.fields.schoolCategoryId === SchoolCategories.GRADUATE_SCHOOL.id ||
                              forms.evaluation.fields.schoolCategoryId === SchoolCategories.VOCATIONAL.id">
                          <label>Course</label>
                          <br>
                          <label class="font-weight-bold">{{ getSelectedEvaluationCourse }} </label>
                        </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col md="6">
                        <b-form-group >
                          <label>Section</label>
                          <b-form-select
                            :disabled="sectionIsLoading"
                            v-model='forms.transcript.fields.sectionId'
                            :state="forms.transcript.states.transcriptSectionId">
                            <template v-slot:first>
                              <b-form-select-option :value='null' disabled>
                                -- Section --
                              </b-form-select-option>
                            </template>
                            <b-form-select-option
                              v-for='section in options.sections.items'
                              :key='section.id'
                              :value='section.id'>
                              {{ section.name }}
                            </b-form-select-option>
                          </b-form-select>
                          <b-form-invalid-feedback>
                            {{forms.transcript.errors.transcriptSectionId}}
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group v-if="forms.evaluation.fields.schoolCategoryId === SchoolCategories.SENIOR_HIGH_SCHOOL.id || 
                          forms.evaluation.fields.schoolCategoryId === SchoolCategories.COLLEGE.id ">
                          <label>Semester</label>
                          <br>
                          <label class="font-weight-bold">{{ getSelectedEvaluationSemester }} </label>
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
            </b-row>
            <b-row>
              <b-col md=4 offset-md="8">
                <b-button
                  block
                  class="float-right"
                  variant="outline-primary"
                  @click="onAddSubject()">
                  <v-icon
                    name="plus-circle" />
                  Add Subject</b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col md=12>
                <b-form-group>
                  <b-form-input :state="forms.transcript.states.subjects" hidden/>
                  <b-form-invalid-feedback>
                    {{ forms.transcript.errors.subjects }}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-table
                  sticky-header="300px"
                  head-variant="light"
                  responsive small hover outlined show-empty
                  :fields="tables.levelSubjects.fields"
                  :items.sync="tables.levelSubjects.items"
                  :busy="tables.levelSubjects.isBusy">
                  <template v-slot:cell(name)="data">
                    <span>{{data.item.code}} {{data.item.name}}</span><br>
                    <small>{{data.item.description}}</small>
                  </template>
                  <template v-slot:table-busy>
                    <div class="text-center my-2">
                      <v-icon 
                        name="spinner" 
                        spin
                        class="mr-2" />
                      <strong>Loading...</strong>
                    </div>
                  </template>
                  <template v-slot:cell(action)="row">
                    <b-button 
                      @click="removeSubject(row)" 
                      size="sm" variant="danger">
                      <v-icon name="trash" />
                    </b-button>
                  </template>
                </b-table>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="9">
                <h5 class="float-right">TOTAL UNITS</h5>
              </b-col>
              <b-col sm="3">
                <h5 class='text-center pl-3'>{{totalUnits}}</h5>
              </b-col>
            </b-row>
          </div>
          <div v-show="forms.activeApplication.fields.applicationStepId === ApplicationSteps.STATUS.id">
            <b-row>
              <b-col md="12">
                <b-alert variant="success" show>
                  <h5>APPLICATION SUBMITTED!</h5>
                  <p>Thank you for submitting your application for this school year. 
                  <br> We will review your application and once approved, you will
                  <br>be able to proceed to payment.
                  <br>
                  <br>We will try to get back to you as soon as we can!</p>
                </b-alert>
                <b-row class="pb-2">
                  <b-col md="12">
                    <div>
                      <span style="font-size: 1.5rem; font-weight: bold">{{ percentage }}% </span>
                      <span>
                        We are still reviewing your application. Please check your account from time to time
                      </span>
                    </div>
                  </b-col>
                </b-row>
                <div class="pb-5">
                  <ProgressIndicator
                    :barCount="6"
                    :activeBar="percentage === 30 ? 2 : percentage === 60 ? 4 : 6"
                  />
                </div>
                <div class="approval-container">
                  <ApprovalIndicator
                    :stages="approvalStages"
                    :currentStage="selectedApprovalStage"
                  />
                </div>
                <b-alert
                  :show="dismissCountDown"
                  variant="info"
                  @dismissed="onUpdateStudent()"
                  @dismiss-count-down="countDownChanged"
                >
                  Please wait a few second, we are setting up for you. Time remaining: {{ dismissCountDown  }} second(s).
                  <v-icon
                    v-if="dismissCountDown"
                    name="spinner"
                    class="mr-2 float-right"
                    spin />
                </b-alert>
              </b-col>
            </b-row>
          </div>
          <div v-show="forms.activeApplication.fields.applicationStepId === ApplicationSteps.PAYMENTS.id">
            <b-row v-if="forms.payment.fields.paymentStatusId === PaymentStatuses.REJECTED.id">
              <b-col md=12>
                <b-alert variant="danger" show>
                  <p>
                    Sorry, your payment is rejected with the ffg. reasons : <br>
                    {{ forms.payment.fields.disapprovalNotes }} <br><br>
                    <small>Please be inform that you can modify your payment and resubmit for evaluation.</small>
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
                        <p style="font-weight: bold">
                          The initial fees should be paid in order to secure the registration of the student. The student will not
                          be officially registered until payment is complete.
                          <br>
                          <br>
                          <span v-if="forms.studentFee.fields.approvalNotes">
                            <strong>IMPORTANT NOTICE : </strong>
                            <br>
                              {{ forms.studentFee.fields.approvalNotes }}
                          </span>
                        </p>
                      </b-alert>
                    </b-col>
                  </b-row>
                  <b-row class="mt-2">
                    <b-col md=12>
                      <b-card
                        border-variant="warning"
                      >
                        <b-row>
                          <b-col md=12>
                            <b-table
                              :fields="tables.billings.fields"
                              :items.sync="tables.billings.items"
                              borderless small responsive
                            >
                              <template v-slot:cell(action)>
                                <a href="#" @click="previewAssessmentForm()">View Details</a>
                              </template>
                            </b-table>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col md=12>
                            <b-list-group  >
                              <b-list-group-item style="border:none;" href="#" class="d-flex justify-content-between align-items-center" 
                                @click="onPaySelected(PayTypes.INITIAL.id)">
                                <div class="mr-4" style="color:black">
                                  <h5 class="mb-1 mt-3">PAY {{ formattedInitialFeeValue }} ONLY</h5>
                                  <p class="mb-2">
                                    Make a payment for initial fee only to be officially registered.
                                  </p>
                                </div>
                                <v-icon name="greater-than" style="color:darkblue"></v-icon>
                              </b-list-group-item>
                              <b-list-group-item style="border:none;" href="#" class="d-flex justify-content-between align-items-center"
                                @click="onPaySelected(PayTypes.CUSTOM.id)">
                                <div class="mr-4" style="color:black">
                                  <h5 class="mb-1 mt-3">PAY CUSTOM AMOUNT</h5>
                                  <p class="mb-2">
                                    Make a full payment or partial payment not less than initial fee to be officially registered.
                                  </p>
                                </div>
                                <v-icon name="greater-than" style="color:darkblue"></v-icon>
                              </b-list-group-item>
                              <b-list-group-item style="border:none;" href="#" class="d-flex justify-content-between align-items-center"
                                @click="onPaySelected(PayTypes.ATTACHMENT.id)">
                                <div class="mr-4" style="color:black">
                                  <h5 class="mb-1 mt-3">ATTACH EXISTING RECEIPT</h5>
                                  <p class="mb-2">
                                    For those students that are already been enrolled for the SY 2020-2021 you will be
                                    needing to attached your official receipt or or any
                                    proof of payment to be confirmed and enrolled in the system.
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
                    You have until {{ forms.billing.fields.dueDate }} to make the payment. 
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
                          borderless small responsive>
                        </b-table>
                        <b-table
                          v-if="forms.payment.fields.paymentModeId === 4"
                          :fields="tables.eWalletAccounts.fields"
                          :items.sync="tables.eWalletAccounts.items"
                          borderless small responsive>
                        </b-table>
                        <b-table
                          v-if="forms.payment.fields.paymentModeId === 5"
                          :fields="tables.peraPadalaAccounts.fields"
                          :items.sync="tables.peraPadalaAccounts.items"
                          borderless small responsive>
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
                              <label>Enter amount you pay</label>
                              <vue-autonumeric
                                v-model="forms.payment.fields.amount"
                                class="form-control text-right" 
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
                              <label>Reference No</label>
                              <b-form-input
                                v-model="forms.payment.fields.referenceNo"
                                :state="forms.payment.states.referenceNo"
                                debounce="500"
                                :disabled="paymentFiles.length > 0 ? false : true"
                              />
                              <b-form-invalid-feedback>
                                {{ forms.payment.errors.referenceNo }}
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
                  <div class="mt-3">
                    <b-button variant="danger" @click="isPaying=false">
                      CANCEL
                    </b-button>
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
          <div v-show="forms.activeApplication.fields.applicationStepId === ApplicationSteps.WAITING.id">
            <b-row>
              <b-col md="12">
                <div v-if="forms.transcript.fields.transcriptStatusId === TranscriptStatuses.ENROLLED.id">
                  <b-alert variant="success" show>
                    <h5>CONGRATULATIONS!</h5>
                    <p> You are now officially enrolled. </p>
                    <small>Please, click here to complete your enrollment.</small> <b-button variant="outline-primary" @click="onCompleteEnrollment"> Click Here</b-button>
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
                      :stages="paymentApprovalStages"
                      :currentStage="selectedPaymentApprovalStage"
                    />
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
      </div>
      <div class="application__action-bar">
        <b-button
          @click="forms.activeApplication.fields.applicationStepId--"
          v-if="buttonBackShowHide(forms.activeApplication.fields.applicationStepId)"
          variant="outline-secondary"
          :disabled="forms.activeApplication.fields.applicationStepId === 1"
          class="application__back-action">
          Back
        </b-button>
        <b-button
          @click="forms.activeApplication.fields.applicationStepId === ApplicationSteps.PAYMENTS.id ? onUpdatePayment() : onUpdateStudent()"
          variant="primary"
          class="application__main-action"
          :disabled="isProcessing"
          v-if="buttonNextShowHide(forms.activeApplication.fields.applicationStepId)">
          <v-icon
            v-if="isProcessing"
            name="sync"
            class="mr-2"
            spin />
            {{ getNextButtonCaption }}
        </b-button>
      </div>
    </div>
    <b-modal 
      v-model="showPaymentFileModal"
      centered
      header-bg-variant="success"
      header-text-variant="light"
      :noCloseOnEsc="true"
      :noCloseOnBackdrop="true"
      >
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
      </b-row> <!-- modal body -->
      <div slot="modal-footer" class="w-100"><!-- modal footer buttons -->
        <b-button 
          class="float-left" 
          @click="onDeletePaymentFile(selectedPaymentFileIndex)"
          variant="outline-danger">
          <v-icon
            v-if="isFileDeleting"
            name="sync"
            class="mr-2"
            spin
          />
          Delete
        </b-button>
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
      </div> <!-- modal footer buttons -->
    </b-modal>  

    <b-modal 
      v-model="showEvaluationFileModal"
      centered
      header-bg-variant="success"
      header-text-variant="light"
      :noCloseOnEsc="true"
      :noCloseOnBackdrop="true"
      >
      <div slot="modal-title"> <!-- modal title -->
        Evaluation File
      </div> <!-- modal title -->
      <b-row> <!-- modal body -->
        <b-col md=12>
          <label>Notes</label>
          <b-textarea 
            v-model="forms.evaluationFile.fields.notes"
            :state="forms.evaluationFile.states.notes"
            rows=7
            debounce="500" />
          <b-form-invalid-feedback>
            {{ forms.evaluationFile.errors.notes }}
          </b-form-invalid-feedback>
        </b-col>
      </b-row> <!-- modal body -->
      <div slot="modal-footer" class="w-100"><!-- modal footer buttons -->
        <b-button 
          class="float-left" 
          @click="onDeleteEvaluationFile(selectedEvaluationFileIndex)"
          variant="outline-danger">
          <v-icon
            v-if="isFileDeleting"
            name="sync"
            class="mr-2"
            spin
          />
          Delete
        </b-button>
        <b-button 
          @click="onUpdateEvaluationFile()"
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
      </div> <!-- modal footer buttons -->
    </b-modal>  
    <!-- Modal Subject -->
    <b-modal 
			v-model="showModalSubjects"
			:noCloseOnEsc="true"
			:noCloseOnBackdrop="true"
			size="xl">
			<div slot="modal-title"> <!-- modal title -->
					Subjects
			</div> <!-- modal title -->
			<b-row> <!-- modal body -->
				<b-col md=12>
          <b-row class="mb-2">
            <b-col md="3">
              <b-form-group v-if="forms.transcript.fields.schoolCategoryId === SchoolCategories.COLLEGE.id
                    || forms.transcript.fields.schoolCategoryId === SchoolCategories.SENIOR_HIGH_SCHOOL.id 
                    || forms.transcript.fields.schoolCategoryId === SchoolCategories.GRADUATE_SCHOOL.id">
                <label>Level</label>
                <b-form-select
                  @change="filterSubject()"
                  v-model="filters.subject.levelId"
                >
                  <template v-slot:first>
                    <b-form-select-option :value='null' >-- All Levels --</b-form-select-option>
                  </template>
                  <b-form-select-option v-for='level in options.levelsOfCourses.items' :key='level.id' :value='level.id'>
                    {{ level.name }}
                  </b-form-select-option>
                </b-form-select>
              </b-form-group>
            </b-col>
             <b-col  md="3">
              <b-form-group v-if="forms.transcript.fields.schoolCategoryId === SchoolCategories.COLLEGE.id
                    || forms.transcript.fields.schoolCategoryId === SchoolCategories.SENIOR_HIGH_SCHOOL.id 
                    || forms.transcript.fields.schoolCategoryId === SchoolCategories.GRADUATE_SCHOOL.id">
                <label>Semester</label>
                <b-form-select
                  @change="filterSubject()"
                  v-model="filters.subject.semesterId"
                >
                  <template v-slot:first>
                    <b-form-select-option :value='null' >-- All Semester --</b-form-select-option>
                  </template>
                  <b-form-select-option v-for='semester in options.semesters.items.values' :key='semester.id' :value='semester.id'>
                    {{ semester.name }}
                  </b-form-select-option>
                </b-form-select>
              </b-form-group>
            </b-col>
            <b-col offset-md="2" md="4">
              <b-form-group>
                <label>Search</label>
                <b-form-input
                  v-model="filters.subject.criteria"
                  type="text"
                  debounce="500"> 
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
					<b-table
						small hover outlined show-empty
						:items.sync="tables.subjects.filteredItems"
						:fields="tables.subjects.fields"
            :filter="filters.subject.criteria"
						:busy="tables.subjects.isBusy"
            :current-page="paginations.subject.page"
            :per-page="paginations.subject.perPage"
            @filtered="onFiltered($event, paginations.subject)">
						<template v-slot:cell(action)="row">
							<b-button 
                @click="addSubject(row)" 
                size="sm" variant="success">
                <v-icon name="plus" />
              </b-button>
						</template>
					</b-table>
          <b-row>
            <b-col md=6>
              Showing {{paginations.subject.from}} to {{paginations.subject.to}} of {{paginations.subject.totalRows}} records.
            </b-col>
            <b-col md=6>
              <b-pagination
                v-model="paginations.subject.page"
                :total-rows="paginations.subject.totalRows"
                :per-page="paginations.subject.perPage"
                size="sm"
                align="end"
                @input="recordDetails(paginations.subject)"
              />
            </b-col>
          </b-row>
				</b-col>
			</b-row> <!-- modal body -->
			<div slot="modal-footer" class="w-100"><!-- modal footer buttons -->
				<b-button 
        class="float-right" 
        variant="outline-danger"
        @click="showModalSubjects=false">
        Close
      </b-button>
			</div> <!-- modal footer buttons -->
		</b-modal>
    <!-- Modal Subject -->
    <!-- Modal Preview -->
    <b-modal 
			v-model="showModalPreview"
			size="xl"
			header-bg-variant="success"
			header-text-variant="light"
			:noCloseOnEsc="true"
			:noCloseOnBackdrop="true">
			<div slot="modal-title"> <!-- modal title -->
					Preview
			</div> <!-- modal title -->
			<b-row class="justify-content-md-center"> <!-- modal body -->
				<b-col md=12>
          <div v-if="file.src">
            <center>
              <b-img
                fluid 
                v-if="file.type.substr(0, file.type.indexOf('/')) == 'image'" 
                :src="file.src" />
              <b-embed
                v-else
                type="iframe"
                aspect="16by9"
                allowfullscreen
                :src="file.src"
              ></b-embed>
            </center>
          </div>
				</b-col>
			</b-row> <!-- modal body -->
			<div slot="modal-footer" class="w-100"><!-- modal footer buttons -->
				<b-button 
          class="float-right"
          variant="outline-danger"
          @click="showModalPreview=false">
          Close
        </b-button>
			</div> <!-- modal footer buttons -->
		</b-modal>
    <!-- Modal Preview -->
  </div>
  <!-- main container -->
</template>
<script>
import {
  StudentApi,
  LevelApi,
  AuthApi,
  SchoolYearApi,
  PaymentApi,
  PaymentFileApi,
  BillingApi,
  EWalletAccountApi,
  BankAccountApi,
  SubjectApi,
  SectionApi,
  EvaluationFileApi,
  EvaluationApi,
  CurriculumApi,
  PeraPadalaAccountApi,
  ReportApi,
} from '../../mixins/api';
//import StageIndicator from '../components/StageIndicator';
import GroupStageIndicator from '../components/GroupStageIndicator';
import ApprovalIndicator from '../components/ApprovalIndicator';
import {
  Semesters,
  ApplicationSteps,
  Countries,
  CivilStatuses,
  ApplicationStatuses,
  PaymentStatuses,
  BillingTypes,
  PayTypes,
  TranscriptStatuses,
  EvaluationStatuses,
  StudentCategories,
  SchoolCategories
} from '../../helpers/enum';
import { copyValue } from '../../helpers/extractor';
import { validate, reset, formatNumber, showNotification } from '../../helpers/forms';
import Tables from '../../helpers/tables'
import PhotoViewer from '../components/PhotoViewer'
import  FileUploader from '../components/FileUploader'
import  FileItem from '../components/FileItem'
import ProgressIndicator from '../components/ProgressIndicator';

const studentFields = {
  id: null,
  studentNo: null,
  firstName: null,
  middleName: null,
  lastName: null,
  mobileNo: null,
  birthDate: null,
  civilStatusId: null,
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

const educationFields = {
  lastSchoolAttended: null,
  lastSchoolAddress: null,
  lastSchoolYearFrom: null,
  lastSchoolYearTo: null,
  lastLevel: null,
  elementaryCourse: null,
  elementaryCourseYearFrom: null,
  elementaryCourseYearTo: null,
  elementaryCourseHonors: null,
  highSchoolCourse: null,
  highSchoolCourseYearFrom: null,
  highSchoolCourseYearTo: null,
  highSchoolCourseHonors: null,
  seniorSchoolCourse: null,
  seniorSchoolCourseYearFrom: null,
  seniorSchoolCourseYearTo: null,
  seniorSchoolCourseHonors: null,
  collegeDegree: null,
  collegeDegreeYearFrom: null,
  collegeDegreeYearTo: null,
  collegeDegreeHonors: null,
}

const activeApplicationFields = {
  id: null,
  appliedDate: null,
  schoolYearId: null,
  applicationStatusId : null,
  applicationStepId: null,
  disapprovalNotes: null
}

const transcriptFields = {
  id: null,
  semesterId: null,
  levelId: null,
  courseId: null,
  schoolYearId: null,
  schoolCategoryId: null,
  transcriptStatusId: null,
  sectionId: null,
  studentCategoryId: null,
  curriculumId: null,
}

const transcriptErrorFields = {
  transcriptLevelId: null,
  transcriptSectionId: null,
  subjects: null
}

const evaluationFields = {
  id : null,
  curriculumId: null,
  studentCategoryId: null,
  levelId: null,
  courseId: null,
  evaluationStatusId: null,
  lastSchoolYearFrom: null,
  lastSchoolYearTo: null,
  lastSchoolAttended: null,
  enrolledYear: null,
  notes: null,
  approvalNotes: null,
  disapprovalNotes: null,
  school_category_id: null,
  studentCurriculumId: null,
  semesterId: null,
}

const evaluationErrorFields = {
  evaluationLevelId: null,
  evaluationCourseId: null,
  evaluationLastSchoolYearFrom: null,
  evaluationLastSchoolYearTo: null,
  evaluationLastSchoolAttended: null,
  evaluationEnrolledYear: null,
  evaluationSemesterId: null,
}

const billingFields = {
  id: null,
  billingNo: null,
  dueDate: null,
  totalAmount: null
}

const paymentFields = {
  id: null,
  referenceNo: null,
  amount: 0,
  datePaid: null,
  paymentModeId: 1,
  notes: null,
  paymentStatusId: PaymentStatuses.PENDING.id,
  disapprovalNotes: null,
}

const paymentErrorFields = {
  referenceNo: null,
  amount: null,
  datePaid: null,
  paymentModeId: 1,
  notes: null
}

const paymentFileFields = {
  id: null,
  notes: null
}

const evaluationFileFields = {
  id: null,
  notes: null
}

const studentFeeFields = {
  approvalNotes: null
}

export default {
  name: "Application",
  mixins: [
    StudentApi,
    LevelApi,
    AuthApi,
    SchoolYearApi,
    PaymentApi,
    PaymentFileApi,
    BillingApi,
    EWalletAccountApi,
    BankAccountApi,
    SubjectApi,
    SectionApi,
    Tables,
    EvaluationFileApi,
    EvaluationApi,
    CurriculumApi,
    PeraPadalaAccountApi,
    ReportApi
  ],
  components: {
    ApprovalIndicator,
    GroupStageIndicator,
    PhotoViewer,
    FileUploader,
    FileItem,
    ProgressIndicator
  },
  data() {
    return {
      showPaymentFileModal: false,
      showEvaluationFileModal: false,
      showModalSubjects: false,
      showModalPreview: false,
      selectedPaymentMode: 1,
      selectedPayType: 1,
      paymentFiles: [],
      evaluationFiles: [],
      selectedPaymentFileIndex: null,
      selectedEvaluationFileIndex: null,
      isFileUpdating: false,
      isFileDeleting: false,
      isLoading: false,
      isApplied: false,
      dismissCountDown: 0,
      evaluationDismissCountDown: 0,
      percentage: 30,
      isProcessing: false,
      studentPhotoUrl: null,
      ApplicationStatuses: ApplicationStatuses,
      ApplicationSteps: ApplicationSteps,
      PaymentStatuses: PaymentStatuses,
      TranscriptStatuses: TranscriptStatuses,
      BillingTypes: BillingTypes,
      PayTypes: PayTypes,
      EvaluationStatuses: EvaluationStatuses,
      StudentCategories: StudentCategories,
      SchoolCategories: SchoolCategories,
      isPaying: false,
      Semesters: Semesters,
      file: {
        src: null,
        type: null
      },
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
        education: {
          fields: { ...educationFields },
          states: { ...educationFields },
          errors: { ...educationFields }
        },
        activeApplication : {
          fields: { ...activeApplicationFields }
        },
        transcript: {
          fields: { ...transcriptFields },
          states: { ...transcriptErrorFields },
          errors: { ...transcriptErrorFields }
        },
        evaluation: {
          fields: { ...evaluationFields },
          states: { ...evaluationErrorFields },
          errors: { ...evaluationErrorFields }
        },
        evaluationFile: {
          fields: { ...evaluationFileFields },
          states: { ...evaluationFileFields },
          errors: { ...evaluationFileFields }
        },
        billing: {
          fields: { ...billingFields },
          states: { ...billingFields },
          errors: { ...billingFields }
        },
        studentFee: {
          fields: { ...studentFeeFields },
        },
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
      tables :{
        levelSubjects: {
          isBusy: false,
          fields: [
            {
              key: "name",
              label: "SUBJECTS",
              tdClass: "align-middle",
              thStyle: { width: "65%" }
            },
            {
              key: "units",
              label: "LEC UNITS",
              tdClass: "align-middle text-center",
              thClass: "text-center",
              thStyle: { width: "15%" }
            },
            {
              key: "labs",
              label: "LAB UNITS",
              tdClass: "align-middle text-center",
              thClass: "text-center",
              thStyle: { width: "15%" }
            },
            {
              key: "totalUnits",
              label: "Total Units",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              thStyle: {width: "8%"}
            },
            {
              key: "action",
              label: "",
              tdClass: "align-middle text-center",
              thStyle: {width: "5%"}
            }
          ],
          items: []
        },
        subjects: {
          isBusy: false,
          fields: [
            {
              key: "name",
              label: "Subject Code",
              tdClass: "align-middle",
              thStyle: {width: "12%"}
            },
            {
              key: "description",
              label: "Description",
              tdClass: "align-middle",
              thStyle: {width: "auto"}
            },
            {
              key: "units",
              label: "Lec Units",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              thStyle: {width: "8%"}
            },
            {
              key: "labs",
              label: "Lab Units",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              thStyle: {width: "8%"}
            },
            {
              key: "totalUnits",
              label: "Total Units",
              tdClass: "align-middle text-right",
              thClass: "text-right",
              thStyle: {width: "8%"}
            },
            {
              key: "action",
              label: "",
              tdClass: "align-middle text-center",
              thStyle: {width: "5%"}
            }
          ],
          items: [],
          filteredItems: []
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
        billings: {
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
        }
      },
      paginations: {
        subject: {
          from: 0,
          to: 0,
          totalRows: 0,
          page: 1,
          perPage: 10,
        }
      },
      filters: {
        subject: {
          criteria: null,
          levelId: null,
          courseId: null
        }
      },
      options: {
        levels:{
          items:[]
        },
        courses :{
          items: []
        },
        sections :{
          items: []
        },
        countries: {
          items: Countries
        },
        civilStatuses: {
          items: CivilStatuses
        },
        semesters: {
          items: Semesters
        },
        schoolYears: {
          items: []
        },
        paymentModes: {
          items: [
            { id: 1, name: 'Bank Deposit/Transfer', description: 'With this payment mode, you can deposit or transfer your payment using your preferred Bank. You can just take a photo of the deposit slip or screenshot of the Bank Transfer transaction you made. Attach it here and we will just review it.' },
            { id: 4, name: 'E-Wallet', description: 'With this payment mode, you can send us the payment using the E-Wallet services. You will just need to screenshot the transaction you made. Attach it here and we will just review it.'  },
            { id: 5, name: 'Pera Padala', description: 'With this payment mode, you can send us the payment using the Pera Padala services. You will just need to screenshot the transaction you made. Attach it here and we will just review it.'  },
            { id: 3, name: 'Others', description: 'If you are already enrolled, you can select this payment mode so should just attach your receipt here or any proof of your payment.'  }
          ]
        },
        levelsOfCourses: {
          items: []
        }
      },
      selectedApprovalStage: 1,
      selectedPaymentApprovalStage: 1,
      selectedEvaluationApprovalStage: 1,
      groupStages: [
        {
          header: 'Personal Information',
          children: [
            { id: 1, subHeader: 'Profile', description: 'Officially registering you is just few steps away. First, tell us a bit about yourself.' },
            { id: 2, subHeader: 'Address', description: 'Let us know your address. Please include all required(*) fields.' },
            { id: 3, subHeader: 'Family', description: 'Details about your family. Please include all required(*) fields.' },
            { id: 4, subHeader: 'Education', description: 'Details about your previous educational background. Please include all required(*) fields.' }
          ]
        },
        {
          header: 'Application & Evaluation',
          children: [
            { id: 5, subHeader: 'Evaluation Request', description: 'Reqeusting for subject evaluation.' },
            { id: 6, subHeader: 'Status', description: 'Waiting for subject evaluation.' }
          ]
        },
        {
          header: 'Subject Enlistment',
          children: [
            { id: 7, subHeader: 'Subjects', description: 'Details about the level, course, section and the subjects you are requesting to take. Please include all required(*) fields.' },
            { id: 8, subHeader: 'Status', description: 'A few more steps and you\'re done. We will just need to validate your application for the current academic year.' }
          ]
        },
        {
          header: 'Enrollment',
          children: [
            { id: 9, subHeader: 'Payments', description: 'You\'re just one step away to be officially registered. You will just need to pay the following.' },
            { id: 10, subHeader: 'Status', description: 'Details about the current status of your payment. We will just need to confirm if your payment has been receive.' }
          ]
        },
      ],
      // stages: [
      //   'Lorem ipsum dolor amet',
      //   'Lorem ipsum dolor amet',
      //   'Lorem ipsum dolor amet',
      //   'Lorem ipsum dolor amet',
      //   'Lorem ipsum dolor amet'
      // ].map((description, idx) => {
      //   const { name } = ApplicationSteps.values[idx];
      //   return { name, description }
      // }) || [],
      approvalStages: [
        { approvedLabel: 'Application Submitted', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Approved by Registrar', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Approved by Finance', waitingLabel: 'Waiting for Finance' },
        { approvedLabel: 'Done', waitingLabel: 'Waiting for Completion' }
      ],
      paymentApprovalStages: [
        { approvedLabel: 'Payment Submitted', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Approved by Accounting', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Done', waitingLabel: 'Waiting for Completion' }
      ],
      evaluationApprovalStages: [
        { approvedLabel: 'Request For Evaluation Submitted', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Approved by Registrar', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Done', waitingLabel: 'Waiting for Completion' }
      ],
      payTypeId: null,
      sectionIsLoading: false
    };
  },
  created() {
    if (!this.hasActiveApplication && this.hasActiveAdmission) {
      this.$router.push({ path: '/admission' });
      return;
    }

    this.isLoading = true;
    let params = { paginate: false }
    const studentId = this.$store.state.user.id;
    this.getStudent(studentId).then(({ data: student }) => {
      Object.keys(this.forms).forEach((key) => {
        const source = student[key] || student;
        if (source) {
          copyValue(source, this.forms[key].fields);
        }
      })

      if(student.photo){
        this.studentPhotoUrl = process.env.VUE_APP_PUBLIC_PHOTO_URL + student.photo.hashName
      }

      if (student.activeApplication.applicationStatusId === ApplicationStatuses.APPROVED.id) {
        this.showCountdown()
      }

      //todo : review code for percentage and approval stage
      this.percentage = student.activeApplication.applicationStatusId == 1
        ? 100
        : student.transcript.transcriptStatusId == 2
        ? 60
        : 30;

      this.selectedApprovalStage = student.activeApplication.applicationStatusId == 1
        ? 3
        : student.transcript.transcriptStatusId == 2
        ? 2
        : 1;

      this.selectedEvaluationApprovalStage = student.evaluation.evaluationStatusId == 3
        ? 2
        : 1;

      if (student.activeApplication.applicationStepId >= ApplicationSteps.PAYMENTS.id) {
        this.loadBilling()
      }

      const { transcript } = this.forms
      if (student.evaluation.evaluationStatusId === EvaluationStatuses.APPROVED.id) {
        //show countdown
        if (this.forms.activeApplication.fields.applicationStepId === ApplicationSteps.WAITING_EVALUATION.id){
          this.evaluationDismissCountDown = 5
        }

        //set level, course, school cat of transcript
        const { subjects } = this.tables
        const { subject } = this.paginations

        transcript.fields.levelId = student.evaluation.levelId
        transcript.fields.courseId = student.evaluation.courseId
        transcript.fields.semesterId = student.evaluation.semesterId
        transcript.fields.schoolCategoryId = student.evaluation.schoolCategoryId
        transcript.fields.curriculumId = student.evaluation.studentCurriculumId
        subjects.isBusy = true
        this.loadSections()
        //need to load subjects here
        this.getEvaluation(student.evaluation.id).then(({ data }) => {
           const result = data.subjects.filter(subject => subject.pivot.isTaken === 0)

          //clear subjects
          subjects.items = []

          //init new subjects base on evaluation subjects
          subjects.items = data.subjects
          subjects.filteredItems = result
          subject.totalRows = data.subjects.length
          subjects.isBusy = false
          this.recordDetails(subject)
          this.prePopulateStudentSubjects()
        })
      } else if (student.evaluation.evaluationStatusId === EvaluationStatuses.REJECTED.id) {
        //if rejected move 1 step back
        const { activeApplication } = this.forms

        const data = {
          activeApplication: {
            ...activeApplication.fields,
            applicationStepId : ApplicationSteps.REQUEST_EVALUATION.id
          }
        }

        this.updateStudent(data, studentId).then(({ data }) => {
          this.forms.activeApplication.fields.applicationStepId = data.activeApplication.applicationStepId
        })
      }


      //load evaluation files
      this.getEvaluationFiles(this.forms.evaluation.fields.id, params).then(({ data }) => {
        //this.tables.files.items = data
        data.forEach(file => {
          this.evaluationFiles.push({
            id: file.id,
            name: file.name,
            notes: file.notes,
            isBusy: false
          })
        })
      })

    })

    this.getLevelList(params).then(response => {
      const res = response.data
      this.options.levels.items = res
      const level = this.options.levels.items.find(i => i.id == this.forms.evaluation.fields.levelId)
      if (level) {
        this.forms.evaluation.fields.schoolCategoryId = level.schoolCategoryId
      }

    });
    this.getSchoolYearList(params).then(response => {
      const res = response.data
      this.options.schoolYears.items = res
    });

    this.loadEWalletAccounts();
    this.loadBankAccounts();
    this.loadPeraPadalaAccounts();

  },
  methods: {
    onUpdateStudent() {

      const {
        student: { fields: { id: studentId } },
        student,
        address,
        family,
        education,
        transcript,
        evaluation,
        activeApplication: { fields: activeApplication }
      } = this.forms;

      const { items } = this.tables.levelSubjects
      let subjects = []

      items.forEach(subject => {
				subjects.push(subject.id)
			})

      const currentStepIndex = activeApplication.applicationStepId - 1;

      const evaluationStatusId = evaluation.fields.evaluationStatusId === EvaluationStatuses.PENDING.id ||
        evaluation.fields.evaluationStatusId === EvaluationStatuses.REJECTED.id
        ? EvaluationStatuses.SUBMITTED.id
        : evaluation.fields.evaluationStatusId;

      const payloads = [
         student.fields,
        { address: address.fields },
        { family: family.fields },
        { education: education.fields },
        { evaluation: { ...evaluation.fields, evaluationStatusId } },
        null,
        { transcript: transcript.fields, subjects }
      ];

      // added null to skip waiting for evaluation step 
      const formsToValidate = [
        student,
        address,
        family,
        education,
        evaluation,
        null,
        transcript,
      ]

      const applicationStepId = ApplicationSteps.STATUS.id === activeApplication.applicationStepId &&
        activeApplication.applicationStatusId !==1
          ? ApplicationSteps.STATUS.id
          : activeApplication.applicationStepId + 1;

      const applicationStatusId = ApplicationSteps.ACADEMIC_YEAR_APPLICATION.id === activeApplication.applicationStepId
        ? ApplicationStatuses.SUBMITTED.id
        : ApplicationSteps.STATUS.id === activeApplication.applicationStepId
        ? ApplicationStatuses.APPROVED_ASSESMENT.id
        : ApplicationSteps.WAITING.id === activeApplication.applicationStepId
        ? ApplicationStatuses.COMPLETED.id
        : activeApplication.applicationStatusId

      const data = {
        ...payloads[currentStepIndex],
        activeApplication: {
          ...activeApplication,
          id: activeApplication.id,
          applicationStepId,
          applicationStatusId
        }
      }


      formsToValidate.forEach(form => {
        if (form)
        reset(form)
      })

      this.isProcessing = true;
      this.updateStudent(data, studentId).then(({ data }) => {

        //load billing when on payment stage after update
        if (data.activeApplication.applicationStepId === ApplicationSteps.PAYMENTS.id) {
          this.loadBilling()
        }

        copyValue(data.activeApplication, activeApplication);
        this.$set(this.forms.activeApplication, 'fields',  { ...activeApplication })

        //load subjects of student
        if (data.activeApplication.applicationStepId === ApplicationSteps.ACADEMIC_YEAR_APPLICATION.id) {
          this.prePopulateStudentSubjects()
        }

        //make education last school attended and year
        //default to request evaluation with the same fields
        if (data.activeApplication.applicationStepId === ApplicationSteps.REQUEST_EVALUATION.id) {
          evaluation.fields.lastSchoolAttended =  data.education.lastSchoolAttended
          evaluation.fields.lastSchoolYearFrom =  data.education.lastSchoolYearFrom
          evaluation.fields.lastSchoolYearTo=  data.education.lastSchoolYearTo
        }

        this.isProcessing = false;

      }).catch((error) => {
        const { errors } = error.response.data;
        if (formsToValidate[currentStepIndex])
        validate(formsToValidate[currentStepIndex], errors);
        this.isProcessing = false;
      });
    },
    onUpdatePayment() {
      const { payment, billing: { fields: { totalAmount, id: billingId }} } = this.forms

      reset(payment)

      if (payment.fields.amount < totalAmount) {
        showNotification(this, 'danger', `The amount shouldn't be less than the initial fee: ${formatNumber(totalAmount)}.`)
        return
      }

      if (this.paymentFiles.length == 0) {
        showNotification(this, 'danger', 'You should attach atleast one or more proof of payment.')
        return
      }

      const dataPayment = {
        ...payment.fields,
        paymentStatusId: PaymentStatuses.SUBMITTED.id, //set payment status to pending for approval
        billingId
      }

      if (payment.fields.id != null) {
        this.updatePayment(dataPayment, payment.fields.id).then(({ data }) =>{
          copyValue(data, payment)
          this.onUpdateStudent()
        }).catch((error) => {
          const { errors } = error.response.data;
          validate(payment, errors)
          this.isProcessing = false;
        });
      }
    },
    loadCourses() {

      // const { fields } = this.forms.transcript;
      const { fields } = this.forms.evaluation;
      const { items } = this.options.levels


      // console.log(fields.levelId)
      const level = items.find(i => i.id == fields.levelId)
      if (level) {
        fields.schoolCategoryId = level.schoolCategoryId
      }

      fields.courseId = null
      fields.semesterId = null
      // fields.semesterId = null

      const params = { paginate: false }
      this.getCoursesOfLevelList(fields.levelId, params).then(({ data }) => {
        this.options.courses.items = data
        if (data.length === 0) {
          this.loadSections()
          return
        }
        //this.tables.levelSubjects.items = []
      });
    },
    loadSubjectsOfLevel() {
      const { courseId, semesterId, levelId } = this.forms.transcript.fields;
      const { levelSubjects } = this.tables;

      if (this.options.courses.items.length > 0) {
        if (courseId === null || semesterId === null) {
          this.tables.levelSubjects.items = []
          return
        }
      }

      levelSubjects.isBusy = true
      const params = {
        courseId,
        semesterId,
        paginate: false
      }
      this.getSubjectsOfLevelList(levelId, params)
        .then(({ data }) => {
          levelSubjects.items = data
          levelSubjects.isBusy = false
      });

      this.loadSections()
    },
    onSameAddress(isSame) {
      const { address: { fields: address } } = this.forms
      if(isSame) {
        address.permanentHouseNoStreet = address.currentHouseNoStreet
        address.permanentBarangay = address.currentBarangay
        address.permanentCityTown = address.currentCityTown
        address.permanentProvince = address.currentProvince
        address.permanentRegion = address.currentRegion
        address.permanentDistrict = address.currentDistrict
        address.permanentPostalCode = address.currentPostalCode
        address.permanentCountryId = address.currentCountryId
        address.permanentCompleteAddress = address.currentCompleteAddress
        address.permanentHomeLandlineMobileNo = address.currentHomeLandlineMobileNo
      } else {
        address.permanentHouseNoStreet = null
        address.permanentBarangay = null
        address.permanentCityTown = null
        address.permanentProvince = null
        address.permanentRegion = null
        address.permanentDistrict = null
        address.permanentPostalCode = null
        address.permanentCountryId = Countries.PHILIPPINES.id
        address.permanentCompleteAddress = null
        address.permanentHomeLandlineMobileNo = null
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    evaluationCountDownChanged(dismissCountDown) {
      this.evaluationDismissCountDown = dismissCountDown
    },
    showCountdown() {
      this.dismissCountDown = 5
    },
    onPhotoChange(file) {
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
    buttonBackShowHide(applicationStepId) {
      //arrHidden = steps id where the button back should be hidden
      let arrHidden = [ApplicationSteps.PROFILE.id, ApplicationSteps.ACADEMIC_YEAR_APPLICATION.id , ApplicationSteps.STATUS.id, ApplicationSteps.PAYMENTS.id, ApplicationSteps.WAITING.id, ApplicationSteps.WAITING_EVALUATION.id]
      return !arrHidden.includes(applicationStepId)
    },
    buttonNextShowHide(applicationStepId) {
      //arrHidden = steps id where the button next should be hidden
      let arrHidden = [ApplicationSteps.STATUS.id, ApplicationSteps.WAITING.id, ApplicationSteps.WAITING_EVALUATION.id]
      return !arrHidden.includes(applicationStepId)
    },
    loadBilling() {
      const { billings } = this.tables
      const { payment } = this.forms

      const {
        student: { fields: { id: studentId } },
        transcript: { fields: { semesterId: semesterId, schoolYearId: schoolYearId } }
      } = this.forms;

      const params = {
        studentId: studentId,
        schoolYearId: schoolYearId,
        semesterId: semesterId,
        billingTypeId: BillingTypes.INITIAL.id,
        paginate: false
      }

      this.getBillingList(params).then(({ data }) => {
        billings.items = data
        copyValue(data[0], this.forms.billing.fields)
        this.forms.studentFee.fields.approvalNotes = data[0].studentFee.approvalNotes
        //copyValue(data[0].payments[0], this.forms.payment).
        payment.fields.id = null;
        if (data[0].payments[0] != null) {

          copyValue(data[0].payments[0], this.forms.payment.fields)

          //set payment approval stage
          this.selectedPaymentApprovalStage = payment.fields.paymentStatusId === PaymentStatuses.APPROVED.id
            ? 2
            : 1;

          this.getPaymentFiles(payment.fields.id).then(({ data }) => {
            data.data.forEach(file => {
              this.paymentFiles.push({
                id: file.id,
                name: file.name,
                notes: file.notes,
                isBusy: false
              })
            })
          })

          // if rejected move a step back on application step and application status
          if (payment.fields.paymentStatusId === PaymentStatuses.REJECTED.id) {
            const application = {
              activeApplication: {
                id: this.forms.activeApplication.fields.id,
                applicationStepId: ApplicationSteps.PAYMENTS.id,
                applicationStatusId: ApplicationStatuses.APPROVED_ASSESMENT.id
              }
            }

            this.updateStudent(application, this.forms.student.fields.id).then(({ data }) =>{
              copyValue(data.activeApplication, this.forms.activeApplication.fields);
            })
          }

          if (payment.fields.paymentStatusId === PaymentStatuses.APPROVED.id) {
            const { activeApplication, transcript, student } = this.forms
            const application = {
              activeApplication: {
                id: activeApplication.fields.id
              },
              transcript: {
                id: transcript.fields.id,
                transcriptStatusId: TranscriptStatuses.ENROLLED.id
              }
            }

            this.updateStudent(application, student.fields.id).then(({ data }) =>{
              copyValue(data.activeApplication, activeApplication.fields);
              copyValue(data.transcript, transcript.fields)
            })
          }
        }
      })
    },
    onPaymentFileUpload(file) {
      const formData = new FormData();
      const { payment } = this.forms

      formData.append('file', file);
      this.paymentFiles.push({ id: null, name: null, notes: null, isBusy: true })
      let newFile = this.paymentFiles[this.paymentFiles.length - 1]
      this.addPaymentFile(formData, payment.fields.id).then(({ data }) =>{
        setTimeout(() => {
          newFile.id = data.id
          newFile.name = data.name
          newFile.isBusy = false
        }, 1000);
      })
    },
    onPaySelected(payTypeId) {
      this.payTypeId = payTypeId
      // if payment is null add payment
      if (payTypeId === PayTypes.ATTACHMENT.id) {
        this.forms.payment.fields.paymentModeId = 3
      }
      else {
        this.forms.payment.fields.paymentModeId = 1
      }

      const {
        payment,
        billing,
        billing: { fields: { id: billingId } },
        student: { fields: { id: studentId } },
      } = this.forms

      reset(payment)

      const data = {
        ...payment.fields,
        billingId,
        studentId
      }
      this.isPaying = true

      if (payTypeId === PayTypes.INITIAL.id) {
        payment.fields.amount = billing.fields.totalAmount
      } else {
        payment.fields.amount = 0
      }

      if (payment.fields.id === null) {
        this.addPayment(data).then(({ data }) =>{
          copyValue(data, payment)
          payment.fields.id = data.id
        }).catch((error) => {
          const { errors } = error.response.data;
          validate(payment, errors);
        });
      }
    },
    loadBankAccounts() {
      const params = { paginate: false }
      const { bankAccounts } = this.tables
      this.getBankAccountList(params).then(({ data }) => {
        bankAccounts.items = data
      })
    },
    loadPeraPadalaAccounts() {
      const params = { paginate: false }
      const { peraPadalaAccounts } = this.tables
      this.getPeraPadalaAccountList(params).then(({ data }) => {
        peraPadalaAccounts.items = data
      })
    },
    loadEWalletAccounts() {
      const params = { paginate: false }
      const { eWalletAccounts } = this.tables
      this.getEWalletAccountList(params).then(({ data }) => {
        eWalletAccounts.items = data
      })
    },
    onPaymentFileItemSelect(idx) {
      const { paymentFile } = this.forms
      reset(paymentFile)
      this.selectedPaymentFileIndex = idx

      paymentFile.fields.id = this.paymentFiles[idx].id
      paymentFile.fields.notes = this.paymentFiles[idx].notes

      this.showPaymentFileModal = true
    },
    onUpdatePaymentFile () {
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
    onAddSubject(){
      const { levelId, schoolCategoryId, courseId, semesterId } = this.forms.transcript.fields
      const { levelsOfCourses } = this.options
      const { subjects } = this.tables
      const { subject } = this.paginations
      this.filters.subject.levelId = levelId
      this.filters.subject.semesterId = semesterId

      levelsOfCourses.items = []
      if (levelId == null) {
        return
      }
      if (schoolCategoryId === SchoolCategories.COLLEGE.id || schoolCategoryId === SchoolCategories.SENIOR_HIGH_SCHOOL.id || schoolCategoryId === SchoolCategories.GRADUATE_SCHOOL.id) {
        this.getLevelOfCoursesList(courseId, { paginate: false }).then(({ data }) => {
          levelsOfCourses.items = data
        })
      }

      this.filterSubject()
      this.showModalSubjects = true
    },
    loadSubjectList(){
      // const { subjects } = this.tables
      // const { subject } = this.paginations
      // const { schoolCategoryId } = this.forms.transcript.fields
      // subjects.items = []

      // subjects.isBusy = true
      // let params = { paginate: false, schoolCategoryId }

      // this.getSubjectList(params)
      //   .then(({ data }) => {
      //     subjects.items = data
      //     subject.totalRows = data.length
      //     this.recordDetails(subject)
      //     subjects.isBusy = false
      //   })
    },
    addSubject(row) {
      const { item } = row
      const { items } = this.tables.levelSubjects
      // check if subject exist in the table
      const result = items.find(subject => subject.id === item.id)
      if (result) {
        showNotification(this, 'danger', item.name + ' is already added.')
        return
      }
      items.push(row.item)
    },
    previewPaymentFile(index) {
      this.file.type = null
      this.file.src = null

      const { payment: { fields:{ id: paymentId } } } = this.forms

      const selectedFile = this.paymentFiles[index]

      this.getPaymentFilePreview(paymentId, selectedFile.id)
        .then(response => {
          this.file.type = response.headers.contentType
          const file = new Blob([response.data], { type: response.headers.contentType })
          const reader = new FileReader();

          reader.onload = e => this.file.src = e.target.result
          reader.readAsDataURL(file);
          this.showModalPreview = true
        })
    },
    loadSections () {
      this.sectionIsLoading = true
      this.forms.transcript.fields.sectionId = null
      const { schoolYearId, levelId, courseId, semesterId } = this.forms.transcript.fields
      let params = { paginate: false, schoolYearId, levelId, courseId, semesterId };
      this.getSectionList(params).then(({ data }) => {
        this.options.sections.items = data;
        this.sectionIsLoading = false
      });
    },
    removeSubject(row){
      this.tables.levelSubjects.items.splice(row.index, 1);
    },
    onEvaluationFileUpload(file) {
      const formData = new FormData();
      const { evaluation } = this.forms

      formData.append('file', file);

      this.evaluationFiles.push({ id: null, name: null, notes: null, isBusy: true })
      let newFile = this.evaluationFiles[this.evaluationFiles.length - 1]

      this.addEvaluationFile(formData, evaluation.fields.id).then(({ data }) =>{
        setTimeout(() => {
          newFile.id = data.id
          newFile.name = data.name
          newFile.isBusy = false
        }
          , 1000);
      })
    },
    onDeleteEvaluationFile (index) {
      const { evaluation: { fields:{ id: evaluationId } } } = this.forms

      const selectedFile = this.evaluationFiles[index]
      this.isFileDeleting = true
      selectedFile.isBusy = true
      this.deleteEvaluationFile(evaluationId, selectedFile.id).then(()=> {
        this.isFileDeleting = false
        this.showEvaluationFileModal = false
        this.evaluationFiles.splice(index, 1);
      }).catch((error) => {
        this.isFileDeleting = false
        selectedFile.isBusy = false
      });
    },
    onEvaluationFileItemSelect(idx) {
      const { evaluationFile } = this.forms
      reset(evaluationFile)
      this.selectedEvaluationFileIndex = idx

      evaluationFile.fields.id = this.evaluationFiles[idx].id
      evaluationFile.fields.notes = this.evaluationFiles[idx].notes

      this.showEvaluationFileModal = true
    },
    onUpdateEvaluationFile () {
      const { evaluation: { fields:{ id: evaluationId } },
              evaluationFile } = this.forms

      const selectedFile = this.evaluationFiles[this.selectedEvaluationFileIndex]
      this.isFileUpdating = true
      selectedFile.isBusy = true

      this.updateEvaluationFile(evaluationFile.fields, evaluationId, evaluationFile.fields.id).then(({ data }) => {
        selectedFile.notes = data.notes;
        this.isFileUpdating = false
        this.showEvaluationFileModal = false;
        setTimeout(() => selectedFile.isBusy = false, 1000);
      }).catch((error) => {
        const { errors } = error.response.data;
        validate(paymentFile, errors);
        this.isFileUpdating = false
        selectedFile.isBusy = false
      });
    },
    previewEvaluationFile(index) {
      this.file.type = null
      this.file.src = null

      const { evaluation: { fields:{ id: evaluationId } } } = this.forms

      const selectedFile = this.evaluationFiles[index]

      this.getEvaluationFilePreview(evaluationId, selectedFile.id)
      .then(response => {
        this.file.type = response.headers.contentType
        const file = new Blob([response.data], { type: response.headers.contentType })
        const reader = new FileReader();

        reader.onload = e => this.file.src = e.target.result
        reader.readAsDataURL(file);
        this.showModalPreview = true
      })
    },
    filterSubject() {
      const { subjects } = this.tables
      const { subject } = this.paginations
      const { levelId, semesterId } = this.filters.subject

      if (levelId !== null && semesterId !== null) {
        subjects.filteredItems = subjects.items.filter(s => s.pivot.levelId === levelId && s.pivot.semesterId === semesterId && s.pivot.isTaken === 0 )
      } else if (levelId !== null && semesterId === null) {
        subjects.filteredItems = subjects.items.filter(s => s.pivot.levelId === levelId && s.pivot.isTaken === 0)
      } else if (semesterId !== null && levelId === null) {
        subjects.filteredItems = subjects.items.filter(s => s.pivot.semesterId === semesterId && s.pivot.isTaken === 0)
      }
      else {
        subjects.filteredItems = subjects.items.filter(s =>  s.pivot.isTaken === 0)
      }

      this.onFiltered(subjects.filteredItems, subject)
    },
    prePopulateStudentSubjects() {
      const { evaluation, transcript } = this.forms
      const { subjects } = this.tables
      if (evaluation.fields.studentCategoryId === StudentCategories.NEW.id ||
        (evaluation.fields.studentCurriculumId === evaluation.fields.curriculumId )) {
          this.tables.levelSubjects.isBusy = true
          this.tables.levelSubjects.items = subjects.filteredItems.filter(subject =>
            subject.pivot.isTaken === 0 &&
            subject.pivot.levelId === transcript.fields.levelId &&
            subject.pivot.semesterId === transcript.fields.semesterId
          );
          this.tables.levelSubjects.isBusy = false
      }
    },
    onCompleteEnrollment() {
      const { student, activeApplication } = this.forms

      const applicationStatusId = ApplicationStatuses.COMPLETED.id
      
      const data  = {
        ...student.fields,
        activeApplication: {
          ...activeApplication.fields,
          applicationStatusId
        }
      }

      this.updateStudent(data, student.fields.id).then(({ data }) => {
        this.getAuthenticatedUser().then(({ data: { userable } }) => {
        if (userable) {
          this.$store.commit('SET_USER', userable);
          this.$router.push({path: '/dashboard'});
        }
        }).catch((error) => {
          this.$router.push({ path: '/login' });
        })
      })
    },
    previewAssessmentForm(){
      const { id: transcriptId } = this.forms.transcript.fields
      this.getAssessmentFormPreview(transcriptId)
      .then(({ data }) => {
        const file = new Blob([data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
    },
    previewRequirementList(){
        this.getRequirementListPreview()
        .then(({ data }) => {
          const file = new Blob([data], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        })
      }
  },
  computed: {
    hasActiveAdmission() {
      return !!(this.$store.state.user && this.$store.state.user.activeAdmission);
    },
    hasActiveApplication() {
      return !!(this.$store.state.user && this.$store.state.user.activeApplication);
    },
    totalUnits() {
      let totalUnits = 0
      this.tables.levelSubjects.items.forEach(i => {
        totalUnits += i.totalUnits
      })
      return totalUnits
    },
    heading() {
      const { fields } = this.forms.activeApplication
      if (fields.applicationStepId) {
        const subHeaders = [
          ...this.groupStages[0].children,
          ...this.groupStages[1].children,
          ...this.groupStages[2].children,
          ...this.groupStages[3].children
        ]
        return subHeaders.find(({ id }) => id === fields.applicationStepId)
      }
      return null;
    },
    formattedInitialFeeValue() {
      const { totalAmount } = this.forms.billing.fields
      if (totalAmount) {
        return formatNumber(totalAmount)
      }
      return "0.00"
    },
    getSelectedEvaluationLevel() {
      const { levelId } = this.forms.transcript.fields
      if (levelId) {
        const level = this.options.levels.items.find(level => level.id === levelId)
        if (level) {
          return level.name
        }
      }
      return ''
    },
    getSelectedEvaluationCourse() {
      const { courseId } = this.forms.transcript.fields
      if (courseId) {
        const course = this.options.courses.items.find(course => course.id === courseId)
        if (course) {
          return course.description + (course.major ? ' - ' + course.major : '')
        }
      }
      return ''
    },
    getSelectedEvaluationSemester() {
      const { semesterId } = this.forms.transcript.fields
      if (semesterId) {
        return this.Semesters.getEnum(semesterId).name
      }
      return ''
    },
    getNextButtonCaption() {
      if (this.forms.activeApplication.fields.applicationStepId === ApplicationSteps.ACADEMIC_YEAR_APPLICATION.id) {
        return 'Submit Application'
      } else if (this.forms.activeApplication.fields.applicationStepId === ApplicationSteps.REQUEST_EVALUATION.id ) {
        return 'Submit Request'
      }  else if (this.forms.activeApplication.fields.applicationStepId === ApplicationSteps.PAYMENTS.id ) {
        return 'Submit Payment'
      } else {
        return 'Next'
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";

  .application__container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .application__pane {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    max-width: 1200px;
  }

  .application__left-pane {
    height: 100%;
    padding: 25px 20px;
    flex: 0 1 280px;

    @include for-size(tablet-portrait-down) {
      // for the meantime, we'll hide this
      // planning to add nav dots for lower screen size in the future
      display: none;
    }
  }

  .application__main-pane {
    flex: 1;
    display: flex;
    flex-direction: row;
    //align-items: center;
    justify-content: center;
  }

  .application__action-bar {
    position: fixed;
    height: 60px;
    background-color: $white;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 30px;
    border-top: 1px solid $brand-border-color;
    z-index: 2;

    @include for-size(phone-only) {
      padding: 0 15px;
    }
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

  .application__wizard-form {
    padding: 30px 15px 50px 15px;
    width: 100%;
    max-width: 750px;
    //border: 1px solid $brand-border-color;
    margin: 25px 10px 80px 10px;
    //border-radius: 5px;
    background-color: $white;

    @include for-size(tablet-portrait-down) {
      margin: 0 0 50px 0;
      border: none;
    }
  }

  .application__form-title {
    font-size: 18px;
  }

  .application__form-description {
    font-size: 14px;
    margin-bottom: 20px;
    color: $gray;
  }

  .approval-container {
    width: 100%;
    height: 100px;
  }

  .approval-actions {
    padding: 20px 50px;
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

  .file-uploader-container {
    width: 100%;
    height: 250px;
    margin: 20px 0 20px 0;

  }

  .file-item-container {
    width: 100%;
    height: auto;
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

</style>