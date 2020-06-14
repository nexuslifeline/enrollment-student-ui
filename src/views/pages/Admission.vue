<template>
  <div>
    <!-- main container -->
    <b-overlay :show='isLoading' rounded="sm">
      <b-row>
        <b-col md="12">
          <b-card>
            <b-row>
              <b-col md="4">
                <div class="left-pane">
                  <!--<StageIndicator
                    :stages="stages"
                    :activeIndex="forms.activeAdmission.fields.admissionStepId - 1"
                    headerKey="name"
                    descriptionKey="description" />-->
                  <GroupStageIndicator
                    :stages="groupStages"
                    :activeId="forms.activeAdmission.fields.admissionStepId"
                  />
                </div>
              </b-col>
              <b-col md="8">
                <b-card style="min-height: 600px;">
                  <b-card-body>
                    <h4>{{heading && heading.subHeader}}</h4>
                    <p>{{heading && heading.description}}</p>
                    <!-- About You -->
                    <div v-show="forms.activeAdmission.fields.admissionStepId === 1">
                      <b-row class="mt-4">
                        <b-col md="6">
                          <b-form-group>
                            <label>Firstname</label>
                            <b-form-input
                              v-model="forms.student.fields.firstName" />
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Middlename</label>
                            <b-form-input
                              v-model="forms.student.fields.middleName" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <b-form-group>
                            <label>Lastname</label>
                            <b-form-input
                              v-model="forms.student.fields.lastName" />
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Mobile No.</label>
                            <b-form-input
                              v-model="forms.student.fields.mobileNo" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <b-form-group>
                            <label>Birthdate</label>
                            <b-form-input type="date" v-model="forms.student.fields.birthDate" />
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Civil Status</label>
                            <b-form-select v-model="forms.student.fields.civilStatusId">
                              <template v-slot:first>
                                <b-form-select-option :value='null' disabled>--Select Civil Status --</b-form-select-option>
                              </template>
                              <b-form-select-option v-for='civilStatus in options.civilStatuses.items.values' :key='civilStatus.id' :value='civilStatus.id'>
                                {{civilStatus.name}}
                              </b-form-select-option>
                            </b-form-select>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md=12>
                          <b-row>
                            <b-col md=12>
                              <p>In case of emergency, Please contact : </p>
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col md="6">
                              <b-form-group>
                                <label>Parent/Guardian</label>
                                <b-form-input type="text" v-model="forms.student.fields.parentGuardianName"/>
                              </b-form-group>
                            </b-col>
                            <b-col md="6">
                              <b-form-group>
                                <label>Parent/Guardian Contact No.</label>
                                <b-form-input type="text" v-model="forms.student.fields.parentGuardianContactNo"/>
                              </b-form-group>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                    </div>
                    <!-- About You -->
                    <!-- Complete Address -->
                    <div v-show="forms.activeAdmission.fields.admissionStepId === 2">
                      <b-row>
                         <b-col md="4">
                          <b-form-group>
                            <label>House No/Street</label>
                            <b-form-input
                              v-model="forms.address.fields.currentHouseNoStreet" />
                          </b-form-group>
                        </b-col>
                        <b-col md="4">
                          <b-form-group>
                            <label>City/Town</label>
                            <b-form-input
                              v-model="forms.address.fields.currentCityTown" />
                          </b-form-group>
                        </b-col>
                        <b-col md="4">
                          <b-form-group>
                            <label>Province</label>
                            <b-form-input
                              v-model="forms.address.fields.currentProvince" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="4">
                          <b-form-group>
                            <label>Postal Code</label>
                            <b-form-input
                              v-model="forms.address.fields.currentPostalCode" />
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
                            <label>Country</label>
                            <b-form-select v-model="forms.address.fields.currentCountryId">
                              <template v-slot:first>
                                <b-form-select-option :value='null' disabled>--Select Country --</b-form-select-option>
                              </template>
                              <b-form-select-option v-for='country in options.countries.items.values' :key='country.id' :value='country.id'>
                                {{country.name}}
                              </b-form-select-option>
                            </b-form-select>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Home Landline/Mobile No.</label>
                            <b-form-input
                              v-model="forms.address.fields.currentHomeLandlineMobileNo" />
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
                      <b-row>
                         <b-col md="4">
                          <b-form-group>
                            <label>House No/Street</label>
                            <b-form-input
                              v-model="forms.address.fields.permanentHouseNoStreet" />
                          </b-form-group>
                        </b-col>
                        <b-col md="4">
                          <b-form-group>
                            <label>City/Town</label>
                            <b-form-input
                              v-model="forms.address.fields.permanentCityTown" />
                          </b-form-group>
                        </b-col>
                        <b-col md="4">
                          <b-form-group>
                            <label>Province</label>
                            <b-form-input
                              v-model="forms.address.fields.permanentProvince" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="4">
                          <b-form-group>
                            <label>Postal Code</label>
                            <b-form-input
                              v-model="forms.address.fields.permanentPostalCode" />
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
                            <label>Country</label>
                            <b-form-select v-model="forms.address.fields.permanentCountryId">
                              <template v-slot:first>
                                <b-form-select-option :value='null' disabled>--Select Contry --</b-form-select-option>
                              </template>
                              <b-form-select-option v-for='country in options.countries.items.values' :key='country.id' :value='country.id'>
                                {{country.name}}
                              </b-form-select-option>
                            </b-form-select>
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Home Landline/Mobile No.</label>
                            <b-form-input
                              v-model="forms.address.fields.permanentHomeLandlineMobileNo" />
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
                    <!-- Complete Address -->
                    <!-- Family Background -->
                    <div v-show="forms.activeAdmission.fields.admissionStepId === 3">
                      <b-row>
                        <b-col md="6">
                          <b-form-group>
                            <label>Father</label>
                            <b-form-input
                              v-model="forms.family.fields.fatherName" />
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
                              v-model="forms.family.fields.fatherEmail" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row class="mt-3">
                        <b-col md="6">
                          <b-form-group>
                            <label>Mother</label>
                            <b-form-input
                              v-model="forms.family.fields.motherName" />
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
                              v-model="forms.family.fields.motherEmail" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </div>
                    <!-- Family Background -->
                    <!-- Previous Education -->
                    <div v-show="forms.activeAdmission.fields.admissionStepId === 4">
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
                    <!-- Previous Education -->
                    <!-- Admission -->
                    <div >
                      <div v-show="forms.activeAdmission.fields.admissionStepId === 5">
                        <b-row>
                          <b-col md="6">
                            <b-form-group>
                              <label>Level</label>
                              <b-form-select @input="loadCourses()" v-model='forms.transcript.fields.levelId'>
                                <template v-slot:first>
                                  <b-form-select-option :value='null' disabled>-- Level --</b-form-select-option>
                                </template>
                                <b-form-select-option v-for='level in options.levels.items' :key='level.id' :value='level.id'>
                                  {{level.name}}
                                </b-form-select-option>
                              </b-form-select>
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
                          <!-- <b-col md="6">
                            <b-form-group>
                              <label>School Year</label>
                              <b-form-select v-model='forms.transcript.fields.schoolYearId'>
                                <template v-slot:first>
                                  <b-form-select-option :value='null' disabled>-- School Year --</b-form-select-option>
                                </template>
                                <b-form-select-option v-for='year in options.schoolYears.items' :key='year.id' :value='year.id'>
                                  {{year.name}}
                                </b-form-select-option>
                              </b-form-select>
                            </b-form-group>
                          </b-col> -->
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
                    </div>
                    <!--End  Admission -->
                    <!-- Requirements -->
                    <div>
                      <div v-show="forms.activeAdmission.fields.admissionStepId === 6 && forms.activeAdmission.fields.applicationStatusId === 2">
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
                              :busy="tables.files.isBusy"
                            >
                            <template v-slot:cell(action)="row">
                              <b-button @click="removeFile(row)" size="sm" variant="danger"><b-icon-x></b-icon-x></b-button>
                            </template>
                            </b-table>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                    <!--End Requirements -->
                    <div>
                      <div v-show="forms.activeAdmission.fields.admissionStepId === 6 && (forms.activeAdmission.fields.applicationStatusId === 4 || forms.activeAdmission.fields.applicationStatusId === 1)">
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
                                <b-progress :value="percentage === 30 ? 100 : 0" variant="success"></b-progress>
                              </b-col>
                              <b-col md="2">
                                <b-progress :value="percentage === 30 ? 100 : 0" variant="success"></b-progress>
                              </b-col>
                              <b-col md="2">
                                <b-progress :value="percentage === 60 ? 100 : 0" variant="success"></b-progress>
                              </b-col>
                              <b-col md="2">
                                <b-progress :value="percentage === 60 ? 100 : 0" variant="success"></b-progress>
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
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-card-body>
                  <template v-slot:footer v-if="forms.activeAdmission.fields.applicationStatusId !==4 && forms.activeAdmission.fields.applicationStatusId !==1">
                    <b-button
                      @click="forms.activeAdmission.fields.admissionStepId--"
                      :disabled="forms.activeAdmission.fields.admissionStepId === 1"
                      class="float-left"
                      >
                      Back
                    </b-button>
                    <b-button
                      @click="onUpdateStudent()"
                      variant="outline-primary"
                      class="float-right"
                      :disabled="isProcessing"
                      >
                      <v-icon
                        v-if="isProcessing"
                        name="sync"
                        class="mr-2"
                        spin
                      />
                      {{forms.activeAdmission.fields.admissionStepId !== 6 ? 'Next' : 'Submit Application'}}
                    </b-button>
                  </template>
                </b-card>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-overlay>
  </div>
  <!-- main container -->
</template>
<script>
import { StudentApi, LevelApi, AuthApi, SchoolYearApi, AdmissionFileApi } from "../../mixins/api"
//import StageIndicator from '../components/StageIndicator'
import GroupStageIndicator from '../components/GroupStageIndicator';
import { Semesters, AdmissionSteps, CivilStatuses, Countries } from '../../helpers/enum'
import ApprovalIndicator from '../components/ApprovalIndicator'
import { copyValue } from '../../helpers/extractor';

const studentFields = {
  id: null,
  firstName: null,
  middleName: null,
  lastName: null,
  mobileNo: null,
  birthDate: null,
  civilStatusId: null,
  parentGuardianName: null,
  parentGuardianContactNo: null
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
  currentHouseNoStreet: null,
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

const familyFields = {
  fatherName: null,
  fatherOccupation: null,
  fatherMobileNo: null,
  fatherEmail: null,
  motherName: null,
  motherOccupation: null,
  motherMobileNo: null,
  motherEmail: null
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
  admissionStepId: null
}

const transcriptFields = {
  id: null,
  semesterId: null,
  levelId: null,
  courseId: null,
  schoolYearId: null,
  schoolCategoryId: null
}

export default {
    name : "NewStudentInfo",
    mixins: [StudentApi, LevelApi, AuthApi, SchoolYearApi, AdmissionFileApi ],
    components: {
      GroupStageIndicator, ApprovalIndicator
    },
    data(){
      return{
        selectedFile: null,
        isUploading: false,
        isLoading: false,
        isApplied: false,
        isProcessing: false,
        percentage: 30,
        forms:  {
          student: {
          fields: { ...studentFields }
          },
          address: {
            fields: { ...addressFields }
          },
          family: {
            fields: { ...familyFields }
          },
          education: {
            fields: { ...educationFields }
          },
          activeAdmission: {
            fields: { ...activeAdmissionFields }
          },
          transcript : {
            fields: { ...transcriptFields }
          }
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
          }
        },
        selectedApprovalStage: 1,
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
              { id: 6, subHeader: 'Requirements', description: 'Lorem ipsum dolor itet sul dien belaro muhi mukaly' }
            ]
          },
        ],
        // stages: [
        //   'Lorem ipsum dolor amet',
        //   'Lorem ipsum dolor amet',
        //   'Lorem ipsum dolor amet',
        //   'Lorem ipsum dolor amet',
        //   'Lorem ipsum dolor amet',
        //   'Lorem ipsum dolor amet'
        // ].map((description, idx) => {
        //   const { name } = AdmissionSteps.values[idx];
        //   return { name, description }
        // }) || [],
        approvalStages: [
          { approvedLabel: 'Application Submitted', waitingLabel: 'Waiting for Approval' },
          { approvedLabel: 'Approved by Registrar', waitingLabel: 'Waiting for Approval' },
          { approvedLabel: 'Approved by Staff', waitingLabel: 'Waiting for Approval' },
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

        this.getAdmissionFiles(student.activeAdmission.id, params).then(response => {
          const res = response.data
          this.tables.files.items = res
        })
        
        
        //todo : review code for percentage and approval stage
        this.percentage = 
          student.activeAdmission.applicationStatusId == 1 ?
            100 :  student.transcript.transcriptStatusId == 2 ? 
              60: 30
        this.selectedApprovalStage = 
          student.activeAdmission.applicationStatusId == 1 ?
            3 : student.transcript.transcriptStatusId == 2 ? 
              2 : 2
      
      })

      this.isLoading = false;

      this.getLevelList(params).then(response => {
        const res = response.data
        this.options.levels.items = res
      })
    },
    methods: {
      uploadFile(file) {
        if(file){
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
          student: { fields: student },
          address: { fields: address },
          family: { fields: family },
          education: { fields: education },
          transcript: { fields: transcript },
          activeAdmission: { fields: activeAdmission }
        } = this.forms;
        ///const { subjects : { items: subjects } } = this.tables

        const { items } = this.tables.subjects
        let subjects = []
        items.forEach(subject => {
          subjects.push({
            subjectId: subject.id
          })
        })

        const currentStepIndex = activeAdmission.admissionStepId - 1;
        const payloads = [
          student,
          { address },
          { family },
          { education },
          { transcript, subjects }
        ];

        const admissionStepId =
          AdmissionSteps.REQUIREMENTS.id === activeAdmission.admissionStepId
            ? AdmissionSteps.REQUIREMENTS.id
            : activeAdmission.admissionStepId + 1;

        const applicationStatusId =
          AdmissionSteps.REQUIREMENTS.id === activeAdmission.admissionStepId
            ? 4
            : activeAdmission.applicationStatusId;

        const data = {
          ...payloads[currentStepIndex],
          activeAdmission: {
            ...activeAdmission,
            id: activeAdmission.id,
            admissionStepId,
            applicationStatusId
          }
        }

        this.isProcessing = true;
        this.updateStudent(data, studentId).then(({ data }) => {
          copyValue(data.activeAdmission, activeAdmission);
          this.$set(this.forms.activeAdmission, 'fields',  { ...activeAdmission })
          this.isProcessing = false;
        }).catch((error) => {
          console.log(error)
          this.isProcessing = false;
        });
      },
      loadCourses() {
        const { fields } = this.forms.transcript;
        const { items } = this.options.levels
        fields.courseId = null
        fields.semesterId = null
        const params = { paginate: false }
        fields.schoolCategoryId = items.find(i => i.id == fields.levelId).schoolCategoryId
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
        if (fields.applicationStepId) {
          const subHeaders = [
            ...this.groupStages[0].children,
            ...this.groupStages[1].children
          ]
          return subHeaders.find(({ id }) => id === fields.admissionStepId)
        }
        return null;
      }
  }
}
</script>