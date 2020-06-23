<template>
  <div class="admission__container">
    <div class="admission__pane">
      <div class="admission__left-pane">
        <GroupStageIndicator
          :stages="groupStages"
          :activeId="forms.activeAdmission.fields.admissionStepId"
        />
      </div>
      <div class="admission__main-pane">
        <div class="admission__wizard-form">
          <h4 class="admission__form-title">{{heading && heading.subHeader}}</h4>
          <p class="admission__form-description">{{heading && heading.description}}</p>
          <div v-show="forms.activeAdmission.fields.admissionStepId === AdmissionSteps.PROFILE.id">
            <b-row class="mt-4">
              <b-col md="6">
                <b-form-group>
                  <label class="required">Firstname</label>
                  <b-form-input
                    v-model="forms.student.fields.firstName" 
                    :state="forms.student.states.firstName" />
                  <b-form-invalid-feedback>
                    {{forms.student.errors.firstName}}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group>
                  <label>Middlename</label>
                  <b-form-input
                    v-model="forms.student.fields.middleName" />
                </b-form-group>
                <b-form-group>
                  <label class="required">Lastname</label>
                  <b-form-input
                    v-model="forms.student.fields.lastName" 
                    :state="forms.student.states.lastName" />
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
                    v-model="forms.student.fields.mobileNo" />
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
                      {{civilStatus.name}}
                    </b-form-select-option>
                  </b-form-select>
                  <b-form-invalid-feedback>
                    {{forms.student.errors.civilStatusId}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
          </div>
          <div v-show="forms.activeAdmission.fields.admissionStepId === AdmissionSteps.ADDRESS.id">
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
                    :state="forms.address.states.addressCurrentHouseNoStreet" />
                  <b-form-invalid-feedback>
                    {{forms.address.errors.addressCurrentHouseNoStreet}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label class="required">City/Town</label>
                  <b-form-input
                    v-model="forms.address.fields.currentCityTown" 
                    :state="forms.address.states.addressCurrentCityTown" />
                  <b-form-invalid-feedback>
                    {{forms.address.errors.addressCurrentCityTown}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label class="required">Province</label>
                  <b-form-input
                    v-model="forms.address.fields.currentProvince"
                    :state="forms.address.states.addressCurrentProvince" />
                  <b-form-invalid-feedback>
                    {{forms.address.errors.addressCurrentProvince}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="4">
                <b-form-group>
                  <label class="required">Postal Code</label>
                  <b-form-input
                    v-model="forms.address.fields.currentPostalCode"
                    :state="forms.address.states.addressCurrentPostalCode" />
                  <b-form-invalid-feedback>
                    {{forms.address.errors.addressCurrentPostalCode}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label>District</label>
                  <b-form-input
                    v-model="forms.address.fields.currentDistrict" />
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                  <label>Region</label>
                  <b-form-input
                    v-model="forms.address.fields.currentRegion" />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
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
              <b-col md="6">
                <b-form-group>
                  <label class="required">Home Landline/Mobile No.</label>
                  <b-form-input
                    v-model="forms.address.fields.currentHomeLandlineMobileNo"
                    :state="forms.address.states.addressCurrentHomeLandlineMobileNo" />
                  <b-form-invalid-feedback>
                    {{forms.address.errors.addressCurrentHomeLandlineMobileNo}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group>
                    <label>Current Address</label>
                    <b-form-textarea
                      rows="3"
                      v-model="forms.address.fields.currentCompleteAddress" />
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
                      :state="forms.address.states.addressPermanentHouseNoStreet" />
                    <b-form-invalid-feedback>
                      {{forms.address.errors.addressPermanentHouseNoStreet}}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group>
                    <label class="required">City/Town</label>
                    <b-form-input
                      v-model="forms.address.fields.permanentCityTown"
                      :state="forms.address.states.addressPermanentCityTown" />
                    <b-form-invalid-feedback>
                      {{forms.address.errors.addressPermanentCityTown}}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group>
                    <label class="required">Province</label>
                    <b-form-input
                      v-model="forms.address.fields.permanentProvince"
                      :state="forms.address.states.addressPermanentProvince" />
                    <b-form-invalid-feedback>
                      {{forms.address.errors.addressPermanentProvince}}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="4">
                  <b-form-group>
                    <label class="required">Postal Code</label>
                    <b-form-input
                      v-model="forms.address.fields.permanentPostalCode"
                      :state="forms.address.states.addressPermanentPostalCode" />
                    <b-form-invalid-feedback>
                      {{forms.address.errors.addressPermanentPostalCode}}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group>
                    <label>District</label>
                    <b-form-input
                      v-model="forms.address.fields.permanentDistrict" />
                  </b-form-group>
                </b-col>
                <b-col md="4">
                  <b-form-group>
                    <label>Region</label>
                    <b-form-input
                      v-model="forms.address.fields.permanentRegion" />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="6">
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
                <b-col md="6">
                  <b-form-group>
                    <label class="required">Home Landline/Mobile No.</label>
                    <b-form-input
                      v-model="forms.address.fields.permanentHomeLandlineMobileNo"
                      :state="forms.address.states.addressPermanentHomeLandlineMobileNo" />
                    <b-form-invalid-feedback>
                      {{forms.address.errors.addressPermanentHomeLandlineMobileNo}}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group>
                    <label>Permanent Address</label>
                    <b-form-textarea
                      rows="3"
                      v-model="forms.address.fields.permanentCompleteAddress" />
                  </b-form-group>
                </b-col>
              </b-row>
          </div>
          <div v-show="forms.activeAdmission.fields.admissionStepId === AdmissionSteps.FAMILY.id">
            <b-row>
              <b-col md="6">
                <b-form-group>
                  <label class="required">Father</label>
                  <b-form-input
                    v-model="forms.family.fields.fatherName"
                    :state="forms.family.states.familyFatherName" />
                  <b-form-invalid-feedback>
                    {{forms.family.errors.familyFatherName}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label>Contact No.</label>
                  <b-form-input
                    v-model="forms.family.fields.fatherMobileNo" />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group>
                  <label>Occupation</label>
                  <b-form-input
                    v-model="forms.family.fields.fatherOccupation" />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label>Email Address</label>
                  <b-form-input
                    v-model="forms.family.fields.fatherEmail"
                    :state="forms.family.states.familyFatherEmail" />
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
                    :state="forms.family.states.familyMotherName" />
                  <b-form-invalid-feedback>
                    {{forms.family.errors.familyMotherName}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label>Contact No.</label>
                  <b-form-input
                    v-model="forms.family.fields.motherMobileNo" />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group>
                  <label>Occupation</label>
                  <b-form-input
                    v-model="forms.family.fields.motherOccupation" />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label>Email Address</label>
                  <b-form-input
                    v-model="forms.family.fields.motherEmail"
                    :state="forms.family.states.familyMotherEmail" />
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
                        :state="forms.family.states.familyParentGuardianName" />
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
                        :state="forms.family.states.familyParentGuardianContactNo" />
                      <b-form-invalid-feedback>
                        {{forms.family.errors.familyParentGuardianContactNo}}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
          <div v-show="forms.activeAdmission.fields.admissionStepId === AdmissionSteps.EDUCATION.id">
            <b-row>
              <b-col md="8">
                <b-form-group>
                  <label>Last School Attended</label>
                  <b-form-input
                    v-model="forms.education.fields.lastSchoolAttended" />
                </b-form-group>
              </b-col>
              <b-col md="4">
                <b-form-group>
                <label>Level</label>
                <b-form-input
                  v-model="forms.education.fields.year" />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-form-group>
                  <label>Last School Address</label>
                  <b-form-input
                    v-model="forms.education.fields.lastSchoolAddress" />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-row>
                  <b-col md="6">
                    <b-form-group>
                    <label>Elementary Course Completed or Primary</label>
                    <b-form-input
                      v-model="forms.education.fields.elementaryCourse" />
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group>
                      <label>Year</label>
                      <b-form-input
                        v-model="forms.education.fields.elementaryCourseYear" />
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group>
                      <label>Honor Received</label>
                      <b-form-input
                        v-model="forms.education.fields.elementaryCourseHonors"/>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-row>
                  <b-col md="6">
                    <b-form-group>
                      <label>High School Course Completed or Secondary</label>
                      <b-form-input
                        v-model="forms.education.fields.highSchoolCourse"/>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group>
                      <label>Year</label>
                      <b-form-input
                        v-model="forms.education.fields.highSchoolCourseYear"/>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group>
                      <label>Honor Received</label>
                      <b-form-input
                        v-model="forms.education.fields.highSchoolCourseHonors"/>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-row>
                  <b-col md="6">
                    <b-form-group>
                      <label style="font-size: 12px">Senior School Course Completed or Upper Secondary</label>
                      <b-form-input
                        v-model="forms.education.fields.seniorSchoolCourse"/>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group>
                      <label>Year</label>
                      <b-form-input
                        v-model="forms.education.fields.seniorSchoolCourseYear"/>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group>
                      <label>Honor Received</label>
                      <b-form-input
                        v-model="forms.education.fields.seniorSchoolCourseHonors"/>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-row>
                  <b-col md="6">
                    <b-form-group>
                      <label >College Degree(if graduated) or Tertiary</label>
                      <b-form-input
                        v-model="forms.education.fields.collegeDegree"/>
                    </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group>
                      <label>Year</label>
                      <b-form-input
                        v-model="forms.education.fields.collegeDegreeYear"/>
                      </b-form-group>
                  </b-col>
                  <b-col md="3">
                    <b-form-group>
                      <label>Honor Received</label>
                      <b-form-input
                        v-model="forms.education.fields.collegeDegreeHonors"/>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
          <div v-show="forms.activeAdmission.fields.admissionStepId === AdmissionSteps.ACADEMIC_YEAR_ADMISSION.id">
            <b-row>
              <b-col md="6">
                <b-form-group>
                  <label>Level</label>
                  <b-form-select @input="loadCourses()" 
                    v-model='forms.transcript.fields.levelId'
                    :state="forms.transcript.states.transcriptLevelId">                   
                    <template v-slot:first>
                      <b-form-select-option :value='null' disabled>-- Level --</b-form-select-option>
                    </template>
                    <b-form-select-option v-for='level in options.levels.items' :key='level.id' :value='level.id'>
                      {{level.name}}
                    </b-form-select-option>
                  </b-form-select>
                  <b-form-invalid-feedback>
                    {{forms.transcript.errors.transcriptLevelId}}
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group>
                  <label>Course</label>
                  <b-form-select @input="loadSubjects()" v-model='forms.transcript.fields.courseId' :disabled='options.courses.items.length === 0'>
                    <template v-slot:first>
                      <b-form-select-option :value='null' disabled>-- Course --</b-form-select-option>
                    </template>
                    <b-form-select-option v-for='course in options.courses.items' :key='course.id' :value='course.id'>
                      {{course.name}}
                    </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group>
                  <label>Semester</label>
                  <b-form-select @input="loadSubjects()" v-model='forms.transcript.fields.semesterId' :disabled='options.courses.items.length === 0'>
                    <template v-slot:first>
                      <b-form-select-option :value='null' disabled>-- Semester --</b-form-select-option>
                    </template>
                    <b-form-select-option v-for='semester in options.semesters.items.values' :key='semester.id' :value='semester.id'>
                      {{semester.name}}
                    </b-form-select-option>
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-form-group>
                  <b-form-input :state="forms.transcript.states.subjects" hidden/>
                  <b-form-invalid-feedback>
                    {{forms.transcript.errors.subjects}}
                  </b-form-invalid-feedback>
                </b-form-group>
                <b-table
                  sticky-header="300px"
                  head-variant="light"
                  responsive small hover outlined show-empty
                  :fields="tables.subjects.fields"
                  :items.sync="tables.subjects.items"
                  :busy="tables.subjects.isBusy">
                  <template v-slot:cell(name)="data">
                    <span>{{data.item.code}} {{data.item.name}}</span><br>
                    <small>{{data.item.description}}</small>
                  </template>
                </b-table>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="9">
                <h5 class="float-right">TOTAL</h5>
              </b-col>
              <b-col sm="3">
                <h5 class='text-center pl-3'>{{totalUnits}}</h5>
              </b-col>
            </b-row>
          </div>
          <div v-show="forms.activeAdmission.fields.admissionStepId === AdmissionSteps.REQUIREMENTS.id">
            <b-row v-if="forms.activeAdmission.fields.applicationStatusId === ApplicationStatuses.REJECTED.id">
              <b-col md=12>
                <b-alert variant="danger" show>
                  <p>
                    Sorry, your admission is rejected with the ffg. reasons : <br>
                    {{ this.forms.activeAdmission.fields.disapprovalNotes }} <br><br>
                    <small>Please be inform that you can modify your admission and resubmit for evaluation.</small>
                  </p>
                </b-alert>
              </b-col>
            </b-row>
            <b-row>
              <b-col md=12 class="mb-3">
                <b-form-file
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
                  v-model='selectedFile'
                  :disabled='isUploading'
                  class="mb-2">
                </b-form-file>
                <b-button @click="uploadFile(selectedFile)" variant='outline-primary'> <v-icon
                  v-if="this.isUploading"
                  name="sync"
                  class="mr-2"
                  spin
                />Upload</b-button>
              </b-col>
            </b-row>
            <b-row>
              <b-col md=12>
                <b-table
                  sticky-header="300px"
                  head-variant="light"
                  responsive small hover outlined show-empty
                  :fields="tables.files.fields"
                  :items.sync="tables.files.items"
                  :busy="tables.files.isBusy">
                  <template v-slot:cell(action)="row">
                    <b-button @click="removeFile(row)" size="sm" variant="danger">
                    <v-icon name="trash"></v-icon></b-button>
                  </template>
                </b-table>
              </b-col>
            </b-row>
          </div>
          <div v-show="forms.activeAdmission.fields.admissionStepId === AdmissionSteps.STATUS.id">
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
                    <div><span style="font-size: 1.5rem; font-weight: bold">{{percentage}}% </span><span>We are still reviewing your application. Please check your account from time to time</span></div>
                  </b-col>
                </b-row>
                <b-row class="pb-5">
                  <b-col md="2">
                    <b-progress :value="percentage >= 30 ? 100 : 0" variant="success"></b-progress>
                  </b-col>
                  <b-col md="2">
                    <b-progress :value="percentage >= 30 ? 100 : 0" variant="success"></b-progress>
                  </b-col>
                  <b-col md="2">
                    <b-progress :value="percentage >= 60 ? 100 : 0" variant="success"></b-progress>
                  </b-col>
                  <b-col md="2">
                    <b-progress :value="percentage >= 60 ? 100 : 0" variant="success"></b-progress>
                  </b-col>
                  <b-col md="2">
                    <b-progress :value="percentage === 100 ? 100 : 0" variant="success"></b-progress>
                  </b-col>
                  <b-col md="2">
                    <b-progress :value="percentage === 100 ? 100 : 0" variant="success"></b-progress>
                  </b-col>
                </b-row>
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
          <div v-show="forms.activeAdmission.fields.admissionStepId === AdmissionSteps.PAYMENTS.id">
            <div v-show="isPaying===false" > 
              <!--  -->
              <b-row class="mt-4">
                <b-col md=12>
                  <b-row>
                    <b-col md=12>
                      <b-alert show variant="primary">
                        <p>
                          The initial fees should be paid in order to secure the registration of the student. The student will not
                          be officially registered until payment is complete.
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
                            </b-table>
                          </b-col>
                        </b-row>
                        <b-row>
                          <b-col md=12>
                            <b-list-group  >
                              <b-list-group-item style="border:none;" href="#" class="d-flex justify-content-between align-items-center" 
                                @click="onPaySelected(), selectecPaytype=PayTypes.INITIAL.id">
                                <div class="mr-4" style="color:black">
                                  <h5 class="mb-1 mt-3">PAY {{ forms.billing.fields.totalAmount }} ONLY</h5>
                                  <p class="mb-2">
                                    Make a payment for initial fee only to be officially registered.
                                  </p>
                                </div>
                                <v-icon name="greater-than" style="color:darkblue"></v-icon>
                              </b-list-group-item>
                              <b-list-group-item style="border:none;" href="#" class="d-flex justify-content-between align-items-center"
                                @click="onPaySelected(),selectecPaytype=PayTypes.CUSTOM.id">
                                <div class="mr-4" style="color:black">
                                  <h5 class="mb-1 mt-3">PAY CUSTOM AMOUNT</h5>
                                  <p class="mb-2">
                                    Make a full payment or partial payment not less than initial fee to be officially registered.
                                  </p>
                                </div>
                                <v-icon name="greater-than" style="color:darkblue"></v-icon>
                              </b-list-group-item>
                              <b-list-group-item style="border:none;" href="#" class="d-flex justify-content-between align-items-center"
                                @click="onPaySelected(),selectecPaytype=PayTypes.ATTACHMENT.id">
                                <div class="mr-4" style="color:black">
                                  <h5 class="mb-1 mt-3">ATTACH EXISTING RECEIPT</h5>
                                  <p class="mb-2">
                                    For those students that are already been enrolled for the SY 2000-2021 you will be 
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
               <!--  -->
              <b-row>
                <b-col md=12>
                  <b-card border-variant="warning">
                    <b-alert show>
                      <b-form-group>
                        <b-form-radio-group
                          v-model="forms.payment.fields.paymentModeId"
                          :options="options.paymentModes.items"
                          stacked
                        ></b-form-radio-group>
                      </b-form-group>
                    </b-alert>
                  </b-card>
                  <h6>
                    You have until {{ forms.billing.fields.dueDate }} to make the payment. This reference number will not be valid until that.
                  </h6>
                </b-col>
              </b-row>
              <b-row>
                <b-col md=12>
                  <b-table
                    v-if="selectedPaymentMode === 1"
                    :fields="tables.bankAccounts.fields"
                    :items.sync="tables.bankAccounts.items"
                    borderless small responsive
                  >
                  </b-table>

                  <b-table
                    v-if="selectedPaymentMode === 4"
                    :fields="tables.eWalletAccounts.fields"
                    :items.sync="tables.eWalletAccounts.items"
                    borderless small responsive 
                  >
                  </b-table>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col md=12>
                  <div class="file-uploader-container">
                    <FileUploader
                      @onFileChange="onFileChange" @onFileDrop="onFileDrop"
                    />
                  </div>
                  <div class="file-item-container">
                    <FileItem
                      v-for="(item, index) of paymentFiles"
                      :key="index"
                      :title="item.name"
                      :fileIndex="index"
                      :isBusy="item.isBusy"
                    />
                  </div>
                </b-col>
              </b-row>
              <b-row class="mt-3" >
                <b-col md=12>
                  <div style="border:1px dashed gray; padding: 20px">
                    <b-row>
                      <b-col md=12>
                        <b-row>
                          <b-col md=4>
                            <b-form-group>
                              <label>Enter amount you pay</label>
                              <b-form-input
                                v-model="forms.payment.fields.amount"
                                :state="forms.payment.states.amount"
                              />
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
                </b-col>
              </b-row>
              <b-row class="mt-2">
                <b-col md=12>
                  <b-button variant="danger" @click="isPaying=false">
                    CANCEL
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </div>
          <div v-show="forms.activeAdmission.fields.admissionStepId === AdmissionSteps.WAITING.id">
             <b-row>
              <b-col md="12">
                <b-alert variant="success" show>
                  <h5>PAYMENT SUBMITTED !</h5>
                  <p> Thank you for submitting your application for this school year. 
                  <br> We will review your payment and once approved, we will
                  <br> notify you.
                  <br>
                  <br>We will try to get back to you as soon as we can!</p>
                </b-alert>
                <!-- <b-row class="pb-2">
                  <b-col md="12">
                    <div><span style="font-size: 1.5rem; font-weight: bold">{{percentage}}% </span><span>We are still reviewing your application. Please check your account from time to time</span></div>
                  </b-col>
                </b-row> -->
                <!-- <b-row class="pb-5">
                  <b-col md="2">
                    <b-progress :value="percentage >= 30 ? 100 : 0" variant="success"></b-progress>
                  </b-col>
                  <b-col md="2">
                    <b-progress :value="percentage >= 30 ? 100 : 0" variant="success"></b-progress>
                  </b-col>
                  <b-col md="2">
                    <b-progress :value="percentage >= 60 ? 100 : 0" variant="success"></b-progress>
                  </b-col>
                  <b-col md="2">
                    <b-progress :value="percentage >= 60 ? 100 : 0" variant="success"></b-progress>
                  </b-col>
                  <b-col md="2">
                    <b-progress :value="percentage === 100 ? 100 : 0" variant="success"></b-progress>
                  </b-col>
                  <b-col md="2">
                    <b-progress :value="percentage === 100 ? 100 : 0" variant="success"></b-progress>
                  </b-col>
                </b-row> -->
                <div class="approval-container">
                  <ApprovalIndicator
                    :stages="paymentApprovalStages"
                    :currentStage="selectedPaymentApprovalStage"
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
        </div>
      </div>
      <div class="admission__action-bar">
        <b-button
          @click="forms.activeAdmission.fields.admissionStepId--"
          v-if="buttonBackShowHide(forms.activeAdmission.fields.admissionStepId)"
          variant="outline-secondary"
          class="admission__back-action">
          Back
        </b-button>
        <b-button
          @click="onUpdateStudent()"
          variant="primary"
          class="admission__main-action"
          :disabled="isProcessing"
          v-if="buttonNextShowHide(forms.activeAdmission.fields.admissionStepId)">
          <v-icon
            v-if="isProcessing"
            name="sync"
            class="mr-2"
            spin />
            {{forms.activeAdmission.fields.admissionStepId !== AdmissionSteps.REQUIREMENTS.id ? 'Next' : 'Submit Application'}}
        </b-button>
      </div>
    </div>
  </div>
  <!-- main container -->
</template>
<script>
import { StudentApi, LevelApi, AuthApi, SchoolYearApi, AdmissionFileApi, PaymentApi, PaymentFileApi, BillingApi, EWalletAccountApi, BankAccountApi } from "../../mixins/api"
//import StageIndicator from '../components/StageIndicator'
import GroupStageIndicator from '../components/GroupStageIndicator';
import { Semesters, AdmissionSteps, CivilStatuses, Countries, ApplicationStatuses, BillingTypes, PayTypes } from '../../helpers/enum'
import ApprovalIndicator from '../components/ApprovalIndicator'
import  FileUploader from '../components/FileUploader'
import  FileItem from '../components/FileItem'
import { copyValue } from '../../helpers/extractor';
import { validate, reset } from '../../helpers/forms';
import PhotoViewer from '../components/PhotoViewer'
import ApplicationStep from '../../mixins/api/ApplicationStep';

const studentFields = {
  id: null,
  firstName: null,
  middleName: null,
  lastName: null,
  mobileNo: null,
  birthDate: null,
  civilStatusId: null
}

const addressFields = {
  currentHouseNoStreet: null,
  currentCityTown: null,
  currentProvince: null,
  currentRegion: null,
  currentDistrict: null,
  currentPostalCode: null,
  currentCountryId: Countries.PHILIPPINES.id,
  currentCompleteAddress: null,
  currentHomeLandlineMobileNo: null,
  permanentHouseNoStreet: null,
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
  addressCurrentCityTown: null,
  addressCurrentProvince: null,
  addressCurrentRegion: null,
  addressCurrentDistrict: null,
  addressCurrentPostalCode: null,
  addressCurrentCountryId: null,
  addressCurrentCompleteAddress: null,
  addressCurrentHomeLandlineMobileNo: null,
  addressPermanentHouseNoStreet: null,
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
  year: null,
  elementaryCourse: null,
  elementaryCourseYear: null,
  elementaryCourseHonors: null,
  highSchoolCourse: null,
  highSchoolCourseYear: null,
  highSchoolCourseHonors: null,
  seniorSchoolCourse: null,
  seniorSchoolCourseYear: null,
  seniorSchoolCourseHonors: null,
  collegeDegree: null,
  collegeDegreeYear: null,
  collegeDegreeHonors: null,
}

const activeAdmissionFields = {
  id: null,
  appliedDate: null,
  schoolYearId: null,
  applicationStatusId : null,
  admissionStepId: null,
  disapprovalNotes: null
}

const transcriptFields = {
  id: null,
  semesterId: null,
  levelId: null,
  courseId: null,
  schoolYearId: null,
  schoolCategoryId: null
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
  notes: null
}

const paymentErrorFields = {
  referenceNo: null,
  amount: null,
  datePaid: null,
  paymentModeId: 1,
  notes: null
}

const transcriptErrorFields = {
  transcriptLevelId: null,
  subjects: null
}

export default {
    name : "NewStudentInfo",
    mixins: [StudentApi, LevelApi, AuthApi, SchoolYearApi, AdmissionFileApi, PaymentApi, PaymentFileApi,  BillingApi, BankAccountApi, EWalletAccountApi ],
    components: {
      GroupStageIndicator, ApprovalIndicator, PhotoViewer, FileUploader, FileItem
    },
    data(){
      return{
        selectedPaymentMode: 1,
        selectedFile: null,
        paymentFiles: [],
        isUploading: false,
        isLoading: false,
        isApplied: false,
        isProcessing: false,
        dismissCountDown: 0,
        percentage: 30,
        studentPhotoUrl: null,
        ApplicationStatuses: ApplicationStatuses,
        AdmissionSteps: AdmissionSteps,
        BillingTypes: BillingTypes,
        PayTypes: PayTypes,
        selectedPayType: 1,
        isPaying: false,
        forms:  {
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
          activeAdmission : {
            fields: { ...activeAdmissionFields }
          },
          transcript: {
            fields: { ...transcriptFields },
            states: { ...transcriptErrorFields },
            errors: { ...transcriptErrorFields }
          },
          billing: {
            fields: { ...billingFields },
            states: { ...billingFields },
            errors: { ...billingFields }
          },
          payment: {
            fields: { ...paymentFields },
            states: { ...paymentErrorFields },
            errors: { ...paymentErrorFields }
          },
        },
        tables: {
          subjects: {
            isBusy: false,
            fields: [
              {
                key: "name",
                label: "SUBJECTS",
                tdClass: "align-middle",
                thStyle: { width: "80%" }
              },
              {
                key: "units",
                label: "UNITS",
                tdClass: "align-middle text-center",
                thClass: "text-center",
                thStyle: { width: "20%" }
              }
            ],
            items: []
          },
          files: {
            isBusy: false,
            fields: [
              {
                key: "name",
                label: "Filename",
                tdClass: "align-middle",
                thStyle: { width: "auto" }
              },
              {
                key: "action",
                label: "",
                tdClass: "align-middle text-center",
                thClass: "text-center",
                thStyle: { width: "5px" }
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
          billings: {
            fields: [
              {
                key: "billingNo",
                label: "Reference No",
                tdClass: "align-middle",
                thStyle: { width: "20%" }
              },
              {
                key: "dueDate",
                label: "Date",
                tdClass: "align-middle",
                thStyle: { width: "20%" }
              },
              {
                key: "studentFee.totalAmount",
                label: "Total Fees",
                tdClass: "align-middle",
                thStyle: { width: "25%" }
              },
              {
                key: "totalAmount",
                label: "Initial Fee",
                tdClass: "align-middle",
                thStyle: { width: "auto%" }
              },
            ],
            items: []
          }
        },
        options: {
          levels: {
            items: []
          },
          courses: {
            items:[]
          },
          semesters: {
            items: Semesters
          },
          civilStatuses: {
            items: CivilStatuses
          },
          countries: {
            items: Countries
          },
          paymentModes: {
            items: [
              { text: 'Bank Deposit/Transfer', value: 1 },
              { text: 'E-Wallet', value: 4 },
              { text: 'Others', value: 3 }
            ]
          }
        },
        selectedApprovalStage: 1,
        selectedPaymentApprovalStage: 1,
        groupStages: [
          {
            header: 'Personal Information',
            children: [
              { id: 1, subHeader: 'Profile', description: 'Lorem ipsum dolor itet sul dien belaro muhi mukaly' },
              { id: 2, subHeader: 'Address', description: 'Lorem ipsum dolor itet sul dien belaro muhi mukaly' },
              { id: 3, subHeader: 'Family', description: 'Lorem ipsum dolor itet sul dien belaro muhi mukaly' },
              { id: 4, subHeader: 'Education', description: 'Lorem ipsum dolor itet sul dien belaro muhi mukaly' }
            ]
          },
          {
            header: 'Admission',
            children: [
              { id: 5, subHeader: 'Academic Year', description: 'Lorem ipsum dolor itet sul dien belaro muhi mukaly' },
              { id: 6, subHeader: 'Requirements', description: 'Lorem ipsum dolor itet sul dien belaro muhi mukaly' },
              { id: 7, subHeader: 'Status', description: 'Lorem ipsum dolor itet sul dien belaro muhi mukaly' }
            ]
          },
          {
            header: 'Enrollment',
            children: [
              { id: 8, subHeader: 'Payments', description: 'Lorem ipsum dolor itet sul dien belaro muhi mukaly' },
              { id: 9, subHeader: 'Waiting', description: 'Lorem ipsum dolor itet sul dien belaro muhi mukaly' }
            ]
          },
        ],
        approvalStages: [
          { approvedLabel: 'Application Submitted', waitingLabel: 'Waiting for Approval' },
          { approvedLabel: 'Approved by Registrar', waitingLabel: 'Waiting for Approval' },
          { approvedLabel: 'Approved by Staff', waitingLabel: 'Waiting for Approval' },
          { approvedLabel: 'Done', waitingLabel: 'Waiting for Completion' }
        ],
        paymentApprovalStages: [
          { approvedLabel: 'Payment Submitted', waitingLabel: 'Waiting for Approval' },
          { approvedLabel: 'Approved by Accounting', waitingLabel: 'Waiting for Approval' },
          { approvedLabel: 'Done', waitingLabel: 'Waiting for Completion' }
        ],
      }
    },
    created(){
      const params = { paginate: false }
      const studentId = localStorage.getItem('studentId');
      this.getStudent(studentId).then(({ data: student }) => {
        Object.keys(this.forms).forEach((key) => {
          const source = student[key] || student;
          if (source) {
            copyValue(source, this.forms[key].fields);
          }
        })

        if (student.activeAdmission.applicationStatusId === ApplicationStatuses.APPROVED.id) {
          this.showCountdown()
        }

        this.getAdmissionFiles(student.activeAdmission.id, params).then(response => {
          const res = response.data
          this.tables.files.items = res
        })

        if (student.photo) {
          this.studentPhotoUrl = process.env.VUE_APP_PUBLIC_PHOTO_URL +  student.photo.hashName
        }

        //todo : review code for percentage and approval stage
        this.percentage =
          student.activeAdmission.applicationStatusId == 1 ?
            100 :  student.transcript.transcriptStatusId == 2 ?
              60: 30

        this.selectedApprovalStage =
          student.activeAdmission.applicationStatusId == 1 ?
            3 : student.transcript.transcriptStatusId == 2 ?
              2 : 1

        if (student.activeAdmission.admissionStepId >= AdmissionSteps.PAYMENTS.id) {
          this.loadBilling()
        }

      })

      this.loadEWalletAccounts();
      this.loadBankAccounts();

      this.isLoading = false;

      this.getLevelList(params).then(response => {
        const res = response.data
        this.options.levels.items = res
      })

    },
    methods: {
      uploadFile(file) {
        if (file) {
          this.tables.files.isBusy = true
          this.isUploading = true
          let formData = new FormData()
          formData.append('file', file)
          this.saveFile(formData , this.forms.activeAdmission.fields.id).then(response => {
            const res = response.data
            this.tables.files.items.push({ id: res.id, name: res.name })
            this.tables.files.isBusy = false
            this.isUploading = false
            this.selectedFile = null
          }).catch(err => {
             this.isUploading = false
             this.tables.files.isBusy = false
          })
        }
      },
      removeFile(row){
        this.tables.files.isBusy = false
        this.deleteFile(this.forms.activeAdmission.fields.id, row.item.id).then(response => {
          const res = response.data
          this.tables.files.items.splice(row.index, 1);
          this.tables.files.isBusy = true
        })
      },
      onUpdateStudent() {
        const {
          student: { fields: { id: studentId } },
          student,
          address,
          family,
          education,
          transcript,
          activeAdmission: { fields: activeAdmission }
        } = this.forms;
        ///const { subjects : { items: subjects } } = this.tables
        
        console.log()

        const { items } = this.tables.subjects
        let subjects = []
        items.forEach(subject => {
          subjects.push({
            subjectId: subject.id
          })
        })

        const currentStepIndex = activeAdmission.admissionStepId - 1;
        const payloads = [
          student.fields,
          { address: address.fields },
          { family: family.fields },
          { education: education.fields },
          { transcript: transcript.fields, subjects }
        ];

        const formsToValidate = [
          student,
          address,
          family,
          education,
          transcript
        ]
        
        const admissionStepId =
          AdmissionSteps.STATUS.id === activeAdmission.admissionStepId && activeAdmission.applicationStatusId !==1
            ? AdmissionSteps.STATUS.id
              : activeAdmission.admissionStepId + 1;

        const applicationStatusId =
          AdmissionSteps.REQUIREMENTS.id === activeAdmission.admissionStepId
            ? ApplicationStatuses.SUBMITTED.id
              : AdmissionSteps.STATUS.id === activeAdmission.admissionStepId 
                ? ApplicationStatuses.APPROVED_ASSESMENT.id
                  : AdmissionSteps.PAYMENTS.id === activeAdmission.admissionStepId 
                    ? ApplicationStatuses.PAYMENT_SUBMITTED.id
                      : AdmissionSteps.WAITING.id === activeAdmission.admissionStepId 
                        ? ApplicationStatuses.COMPLETED.id 
                            : activeAdmission.applicationStatusId

        

        this.isProcessing = true;
        
        if (this.forms.activeAdmission.fields.admissionStepId === AdmissionSteps.PAYMENTS.id) {
          /// udpate payment on next
          const { payment, billing: { fields: { id: billingId }} } = this.forms

          reset(payment)

          const data = {
            ...payment.fields,
            billingId
          }

          if (payment.fields.id != null) {
            this.updatePayment(data, payment.fields.id).then(({ data }) =>{
              copyValue(data, payment)
            }).catch((error) => {
              const { errors } = error.response.data;
              validate(payment, errors)
              this.isProcessing = false;
              return
            });
          }  
        }

        const data = {
          ...payloads[currentStepIndex],
          activeAdmission: {
            ...activeAdmission,
            id: activeAdmission.id,
            admissionStepId,
            applicationStatusId
          }
        }

        formsToValidate.forEach(form => {
          reset(form)
        })
      
        console.log(data)
        

        this.updateStudent(data, studentId).then(({ data }) => {
          // if (applicationStatusId === ApplicationStatuses.COMPLETED.id) {
          //   this.$router.push({ name: 'Dashboard' })
          //   return
          // }
          copyValue(data.activeAdmission, activeAdmission);
          this.$set(this.forms.activeAdmission, 'fields',  { ...activeAdmission })
          this.isProcessing = false;
        }).catch((error) => {
          const { errors } = error.response.data;
          validate(formsToValidate[currentStepIndex], errors);
          this.isProcessing = false;
        });

      },
      loadCourses() {
        const { fields } = this.forms.transcript;
        const { items } = this.options.levels
        fields.courseId = null
        fields.semesterId = null
        const params = { paginate: false }

        const level = items.find(i => i.id == fields.levelId)
        if (level) {
          fields.schoolCategoryId = level.schoolCategoryId
        } 
        this.getCoursesOfLevelList(fields.levelId, params).then(({ data }) => {
          this.options.courses.items = data
          if (data.length === 0) {
            this.loadSubjects()
            return
          }
          this.tables.subjects.items = []
        });
      },
      loadSubjects() {
        const { courseId, semesterId, levelId } = this.forms.transcript.fields;
        const { subjects } = this.tables;
        if (this.options.courses.items.length > 0) {
          if (courseId === null || semesterId === null) {
            this.tables.subjects.items = []
            return
          }
        }
        subjects.isBusy = true
        const params = {
          courseId,
          semesterId,
          paginate: false
        }
        this.getSubjectsOfLevelList(levelId, params)
          .then(({ data }) => {
            subjects.items = data
            subjects.isBusy = false
        });
      },
      onSameAddress(isSame) {
        const { address: { fields: address } } = this.forms
        if (isSame) {
          address.permanentHouseNoStreet = address.currentHouseNoStreet
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
      showCountdown() {
        this.dismissCountDown = 20
      },
      onPhotoChange(file) {
        const formData = new FormData();
        formData.append('photo', file);
        this.savePhoto(formData, this.forms.student.fields.id).then(response =>{
          const res = response.data
          this.studentPhotoUrl = process.env.VUE_APP_PUBLIC_PHOTO_URL + res.hashName
        })
      },
      onPhotoRemove() {
        this.deletePhoto(this.forms.student.fields.id).then(response =>{
          const res = response.data
          this.studentPhotoUrl = ""
        })
      },
      buttonBackShowHide(admissionStepId) {
        //arrHidden = steps id where the button back should be hidden
        let arrHidden = [AdmissionSteps.PROFILE.id, AdmissionSteps.STATUS.id, AdmissionSteps.PAYMENTS.id, AdmissionSteps.WAITING.id]
        return !arrHidden.includes(admissionStepId)
      },
      buttonNextShowHide(admissionStepId) {
        //arrHidden = steps id where the button next should be hidden
        let arrHidden = [AdmissionSteps.STATUS.id, AdmissionSteps.WAITING.id]
        return !arrHidden.includes(admissionStepId)
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
          //copyValue(data[0].payments[0], this.forms.payment).
          
          payment.fields.id = null;
          if (data[0].payments[0] != null) {
            payment.fields.id = data[0].payments[0].id
            payment.fields.referenceNo = data[0].payments[0].referenceNo
            payment.fields.amount = data[0].payments[0].amount
            payment.fields.datePaid = data[0].payments[0].datePaid
            payment.fields.notes = data[0].payments[0].notes
            payment.fields.paymentModeId = data[0].payments[0].paymentModeId

            this.getPaymentFiles(payment.fields.id).then(({ data }) => {
              this.paymentFiles = data.data
            })

          }

          console.log(payment)
        })
      },
      onFileChange(file) {
        const formData = new FormData();
        const { payment } = this.forms

        formData.append('file', file);

        this.addPaymentFile(formData, payment.fields.id ).then(({ data }) =>{
          console.log(data.name)
          this.paymentFiles.push(
            { name: data.name, isBusy: true}
          );
          setTimeout(() => this.paymentFiles[this.paymentFiles.length - 1].isBusy = false, 1000);
        })
      },
      onFileDrop(file) {
        const formData = new FormData();
        const { payment } = this.forms

        formData.append('file', file);

        this.addPaymentFileApi(formData, payment.fields.id).then(({ data }) =>{
          console.log(data.name)
          this.paymentFiles.push(
            { name: data.name, isBusy: true}
          );
          setTimeout(() => this.paymentFiles[this.paymentFiles.length - 1].isBusy = false, 1000);
        })
      },
      onPaySelected() {
        // if payment is null add payment
        const { payment, billing: { fields: { id: billingId }} } = this.forms

        reset(payment)

        const data = {
          ...payment.fields,
          billingId
        }
        this.isPaying = true
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
      insertUpdatePayment() {
        const { payment, billing: { fields: { id: billingId }} } = this.forms

        reset(payment)

        const data = {
          ...payment.fields,
          billingId
        }
        

        //payment insert
        if (payment.fields.id === null) {
          console.log('add')
          this.addPayment(data).then(({ data }) =>{
            copyValue(data, payment)
            payment.fields.id = data.id
          }).catch((error) => {
            const { errors } = error.response.data;
            validate(payment, errors);
          });
        } else {
          //payment update
          console.log('update')
          this.updatePayment(data, payment.fields.id).then(({ data }) =>{
            //copyValue(data, payment)
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
      loadEWalletAccounts() {
        const params = { paginate: false }
        const { eWalletAccounts } = this.tables
        this.getEWalletAccountList(params).then(({ data }) => {
          eWalletAccounts.items = data
        })
      }
    },
    computed: {
      totalUnits() {
        let totalUnits = 0
        this.tables.subjects.items.forEach(i => {
          totalUnits += i.units
        })
        return totalUnits
      },
      heading() {
        const { fields } = this.forms.activeAdmission
        if (fields.admissionStepId) {
          const subHeaders = [
            ...this.groupStages[0].children,
            ...this.groupStages[1].children
          ]
          return subHeaders.find(({ id }) => id === fields.admissionStepId)
        }
        return {};
      }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";

  .admission__container {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .admission__pane {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    max-width: 1200px;
  }

  .admission__left-pane {
    height: 100%;
    padding: 25px;
    flex: 0 1 260px;

    @include for-size(tablet-portrait-down) {
      // for the meantime, we'll hide this
      // planning to add nav dots for lower screen size in the future
      display: none;
    }
  }

  .admission__main-pane {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .admission__action-bar {
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
  }

  .admission__back-action {
    min-width: 140px;
  }

  .admission__main-action {
    margin-left: auto;
    min-width: 160px;
  }

  .admission__wizard-form {
    padding: 30px 25px 50px 25px;
    width: 100%;
    max-width: 750px;
    border: 1px solid $brand-border-color;
    margin: 25px 10px;
    border-radius: 5px;
    background-color: $white;

    @include for-size(tablet-portrait-down) {
      margin: 0 0 50px 0;
      border: none;
    }
  }

  .admission__form-title {
    font-size: 18px;
  }

  .admission__form-description {
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
    height: 200px;
    margin-bottom: 40px;
  }

  .file-item-container {
    width: 100%;
    height: auto;
  }

</style>