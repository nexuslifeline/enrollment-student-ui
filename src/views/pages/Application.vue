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
                  <label class="required">Postal/Zip Code</label>
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
                  <label >District</label>
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
                  <b-form-select v-model="forms.address.fields.currentCountryId" 
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
                  <label>Complete Address</label>
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
                  <label class="required">Postal/Zip Code</label>
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
                  <b-form-select v-model="forms.address.fields.permanentCountryId"
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
                  <label>Complete Address</label>
                  <b-form-textarea
                    rows="3"
                    v-model="forms.address.fields.permanentCompleteAddress" />
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
          <div v-show="forms.activeApplication.fields.applicationStepId === ApplicationSteps.EDUCATION.id">
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
                          <b-form-select 
                            @input="loadCourses()" 
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
                        <b-form-group v-if="options.courses.items.length > 0">
                          <label>Course</label>
                          <b-form-select 
                            @input="loadSubjectsOfLevel()" 
                            v-model='forms.transcript.fields.courseId' >
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
                        <b-form-group >
                          <label>Section</label>
                          <b-form-select
                            v-model='forms.transcript.fields.sectionId'
                            :state="forms.transcript.states.transcriptSectionId">
                            <template v-slot:first>
                              <b-form-select-option :value='null' disabled>-- Section --</b-form-select-option>
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
                        <b-form-group v-if="options.courses.items.length > 0">
                          <label>Semester</label>
                          <b-form-select
                            @input="loadSubjectsOfLevel()" 
                            v-model='forms.transcript.fields.semesterId'>
                            <template v-slot:first>
                              <b-form-select-option :value='null' disabled>-- Semester --</b-form-select-option>
                            </template>
                            <b-form-select-option v-for='semester in options.semesters.items.values' :key='semester.id' :value='semester.id'>
                              {{ semester.name }}
                            </b-form-select-option>
                          </b-form-select>
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
                    {{forms.transcript.errors.subjects}}
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
                            {{ paymentMode.name }} 
                            <br>
                            <small> {{ paymentMode.description }} </small> 
                          </b-form-radio>
                        </b-form-radio-group>
                      </b-form-group>
                    </b-alert>
                  </b-card>
                  <h6>
                    You have until {{ forms.billing.fields.dueDate }} to make the payment. This reference number will not be valid until that.
                  </h6>
                </b-col>
              </b-row>
              <b-row class="mt-5">
                <b-col md=12>
                  <div class="payment-step-container">
                    <span class="payment-step__number">1</span>
                    <div class="payment-step-details-container">
                      <div v-if="payTypeId !== PayTypes.ATTACHMENT.id">
                        <span v-if="forms.payment.fields.paymentModeId === 1">Choose your preferred bank. You can deposit/transfer your payment in any bank listed below.</span>
                        <span v-if="forms.payment.fields.paymentModeId === 4">Choose your preferred Account.</span>
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
                      </div>
                      <span v-else>Please attach any proof of your payment or your receipt provided by the St. Theresa College.</span>
                    </div>
                  </div>
                  <div v-if="forms.payment.fields.paymentModeId !== 3" class="payment-step-container">
                    <span class="payment-step__number">2</span>
                    <div class="payment-step-details-container">
                      <span>Confirmation of your payment.</span>
                      <span>After paying to your preferred account. Attach deposit slip or any proof of payment.</span>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <b-row class="mt-3">
                <b-col md=12>
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
                                :state="forms.payment.states.amount">
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
                <!-- <b-alert
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
                </b-alert> -->
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
            {{forms.activeApplication.fields.applicationStepId !== 5 ? 'Next' : 'Submit Application'}}
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
            rows=7 />
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
            <b-col offset-md="8" md="4">
              <b-form-input
                v-model="filters.subject.criteria"
                type="text" 
                placeholder="Search">
              </b-form-input>
            </b-col>
          </b-row>
					<b-table
						small hover outlined show-empty
						:items.sync="tables.subjects.items"
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
import { StudentApi, LevelApi, AuthApi, SchoolYearApi,
  PaymentApi, PaymentFileApi, BillingApi, EWalletAccountApi, BankAccountApi,
  SubjectApi, SectionApi } from '../../mixins/api';
//import StageIndicator from '../components/StageIndicator';
import GroupStageIndicator from '../components/GroupStageIndicator';
import ApprovalIndicator from '../components/ApprovalIndicator';
import { Semesters, ApplicationSteps, Countries, CivilStatuses, ApplicationStatuses, PaymentStatuses, BillingTypes, PayTypes, TranscriptStatuses } from '../../helpers/enum';
import { copyValue } from '../../helpers/extractor';
import { validate, reset, formatNumber, showNotification } from '../../helpers/forms';
import Tables from '../../helpers/tables'
import PhotoViewer from '../components/PhotoViewer'
import  FileUploader from '../components/FileUploader'
import  FileItem from '../components/FileItem'

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
  sectionId: null
}

const transcriptErrorFields = {
  transcriptLevelId: null,
  transcriptSectionId: null,
  subjects: null
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

const studentFeeFields = {
  approvalNotes: null
}

export default {
  name: "Application",
  mixins: [StudentApi, LevelApi, AuthApi, SchoolYearApi,
    PaymentApi, PaymentFileApi, BillingApi, EWalletAccountApi, BankAccountApi,
    SubjectApi, SectionApi, Tables ],
  components: {
    ApprovalIndicator,
    GroupStageIndicator,
    PhotoViewer,
    FileUploader,
    FileItem
  },
  data() {
    return {
      showPaymentFileModal: false,
      showModalSubjects: false,
      showModalPreview: false,
      selectedPaymentMode: 1,
      selectedPayType: 1,
      paymentFiles: [],
      selectedPaymentFileIndex: null,
      isFileUpdating: false,
      isFileDeleting: false,
      isLoading: false,
      isApplied: false,
      dismissCountDown: 0,
      percentage: 30,
      isProcessing: false,
      studentPhotoUrl: null,
      ApplicationStatuses: ApplicationStatuses,
      ApplicationSteps: ApplicationSteps,
      PaymentStatuses: PaymentStatuses,
      TranscriptStatuses: TranscriptStatuses,
      BillingTypes: BillingTypes,
      PayTypes: PayTypes,
      isPaying: false,
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
              key: "code",
              label: "Code",
              tdClass: "align-middle",
              thStyle: {width: "6%"}
            },
            {
              key: "name",
              label: "Name",
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
              key: "action",
              label: "",
              tdClass: "align-middle text-center",
              thStyle: {width: "5%"}
            }
          ],
          items: [],
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
              label: "Billing No",
              tdClass: "align-middle",
              thStyle: { width: "20" }
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
              thStyle: { width: "20%" }
            },
            {
              key: "totalAmount",
              label: "Initial Fee",
              tdClass: "align-middle text-right",
              thClass: "align-middle text-right",
              thStyle: { width: "20%" }
            },
            {
              key: "previousBalance",
              label: "Previous Balance",
              tdClass: "align-middle text-right",
              thClass: "align-middle text-right",
              thStyle: { width: "25%" }
            },
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
          criteria: null
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
            { id: 3, name: 'Others', description: 'If you are already enrolled, you can select this payment mode so should just attach your receipt here or any proof of your payment.'  }
          ]
        }
      },
      selectedApprovalStage: 1,
      selectedPaymentApprovalStage: 1,
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
          header: 'Application',
          children: [
            { id: 5, subHeader: 'Subject Enlistment', description: 'Details about the level, course, section and the subjects you are requesting to take. Please include all required(*) fields.' },
            { id: 6, subHeader: 'Status', description: 'A few more steps and you\'re done. We will just need to validate your application for the current academic year.' }
          ]
        },
        {
          header: 'Enrollment',
          children: [
            { id: 7, subHeader: 'Payments', description: 'You\'re just one step away to be officially registered. You will just need to pay the following.' },
            { id: 8, subHeader: 'Waiting', description: 'Details about the current status of your payment. We will just need to confirm if your payment has been receive.' }
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
      payTypeId: null
    };
  },
  created() {
    this.isLoading = true;
    const studentId = localStorage.getItem('studentId');
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
      this.percentage = 
        student.activeApplication.applicationStatusId == 1 ?
          100 :  student.transcript.transcriptStatusId == 2 ? 
            60: 30
      this.selectedApprovalStage = 
        student.activeApplication.applicationStatusId == 1 ?
          3 : student.transcript.transcriptStatusId == 2 ? 
            2 : 1

      if (student.activeApplication.applicationStepId >= ApplicationSteps.PAYMENTS.id) {
        this.loadBilling()
      }
    })


    let params = { paginate: false }
    this.getLevelList(params).then(response => {
      const res = response.data
      this.options.levels.items = res
    });
    this.getSchoolYearList(params).then(response => {
      const res = response.data
      this.options.schoolYears.items = res
    });

    this.loadEWalletAccounts();
    this.loadBankAccounts();

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
        activeApplication: { fields: activeApplication }
      } = this.forms;

      const { items } = this.tables.levelSubjects
      let subjects = []

      items.forEach(subject => {
				subjects.push({
					subjectId: subject.id
				})
			})

      const currentStepIndex = activeApplication.applicationStepId - 1;

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

      const applicationStepId =
          ApplicationSteps.STATUS.id === activeApplication.applicationStepId && activeApplication.applicationStatusId !==1
            ? ApplicationSteps.STATUS.id
              : activeApplication.applicationStepId + 1;

      const applicationStatusId =
          ApplicationSteps.ACADEMIC_YEAR_APPLICATION.id === activeApplication.applicationStepId
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
        reset(form)
      })

      this.isProcessing = true;
      this.updateStudent(data, studentId).then(({ data }) => {
        // if (applicationStatusId === ApplicationStatuses.COMPLETED.id) {
        //   this.$router.push({ name: 'Dashboard' })
        //   return
        // }
        
        //load billing when on payment stage after update
        if (data.activeApplication.applicationStepId === ApplicationSteps.PAYMENTS.id) {
          this.loadBilling()
        }

        copyValue(data.activeApplication, activeApplication);
        this.$set(this.forms.activeApplication, 'fields',  { ...activeApplication })
        this.isProcessing = false;
      }).catch((error) => {
        const { errors } = error.response.data;
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
      this.options.sections.items = []
      const { fields } = this.forms.transcript;
      const { items } = this.options.levels
      // console.log(fields.levelId)
      const level = items.find(i => i.id == fields.levelId)
      if (level) {
        fields.schoolCategoryId = level.schoolCategoryId
      } 
      fields.courseId = null
      fields.semesterId = null
      const params = { paginate: false }
      this.getCoursesOfLevelList(fields.levelId, params).then(({ data }) => {
        this.options.courses.items = data
        if (data.length === 0) {
          this.loadSubjectsOfLevel()
          this.loadSections()
          return
        }
        this.tables.levelSubjects.items = []
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
      let arrHidden = [ApplicationSteps.PROFILE.id, ApplicationSteps.STATUS.id, ApplicationSteps.PAYMENTS.id, ApplicationSteps.WAITING.id]
      return !arrHidden.includes(applicationStepId)
    },
    buttonNextShowHide(applicationStepId) {
      //arrHidden = steps id where the button next should be hidden
      let arrHidden = [ApplicationSteps.STATUS.id, ApplicationSteps.WAITING.id]
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
          this.selectedPaymentApprovalStage = 
            payment.fields.paymentStatusId === PaymentStatuses.APPROVED.id ?
              2 : 1

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

      this.addPaymentFile(formData, payment.fields.id).then(({ data }) =>{
        this.paymentFiles.push(
          {id: data.id, name: data.name, notes: data.notes, isBusy: true}
        );
        setTimeout(() => this.paymentFiles[this.paymentFiles.length - 1].isBusy = false, 1000);
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
      const { payment: { fields:{ id: paymentId } },
              paymentFile } = this.forms

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
        console.log(error)
        this.isFileDeleting = false
        selectedFile.isBusy = false
      });
    },
    onAddSubject(){
      if (this.forms.transcript.fields.levelId == null) {
        return
      }
      this.showModalSubjects = true
      this.loadSubjectList()
    },
    loadSubjectList(){
      const { subjects } = this.tables
      const { subject } = this.paginations
      const { schoolCategoryId } = this.forms.transcript.fields
      subjects.items = []
      
      subjects.isBusy = true
      let params = { paginate: false, schoolCategoryId }
      
      this.getSubjectList(params)
        .then(({ data }) => {
          subjects.items = data
          subject.totalRows = data.length
          this.recordDetails(subject)
          subjects.isBusy = false
        })
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
      this.forms.transcript.fields.sectionId = null
      const { schoolYearId, levelId, courseId, semesterId } = this.forms.transcript.fields
      let params = { paginate: false, schoolYearId: schoolYearId, levelId: levelId , courseId: courseId, semesterId: semesterId };
      this.getSectionList(params).then(({ data }) => {
        this.options.sections.items = data;
      });
    },
    removeSubject(row){
      this.tables.levelSubjects.items.splice(row.index, 1);
    },
  },
  computed: {
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
          ...this.groupStages[2].children
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
    }
  },
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
    padding: 25px;
    flex: 0 1 260px;

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
    align-items: center;
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