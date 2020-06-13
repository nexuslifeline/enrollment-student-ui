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
                  <StageIndicator
                    :stages="stages"
                    :activeIndex="forms.activeApplication.fields.applicationStepId - 1"
                    headerKey="name"
                    descriptionKey="description" />
                </div>
              </b-col>
              <b-col md="8">
                <b-card style="min-height: 600px">
                  <b-card-body>
                    <h4>{{heading.name}}</h4>
                    <!-- <p>{{heading.description}}</p> -->
                    <!-- About You -->
                    <div v-show="forms.activeApplication.fields.applicationStepId === 1">
                      <b-row class="mt-4">
                        <b-col md="6">
                          <b-form-group>
                            <label>Student No</label>
                            <b-form-input
                              v-model="forms.student.fields.studentNo" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
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
                    <div v-show="forms.activeApplication.fields.applicationStepId === 2">
                      <b-row>
                        <b-col md="6">
                          <b-form-group>
                            <label>City Town</label>
                            <b-form-input
                              v-model="forms.address.fields.city" />
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Province</label>
                            <b-form-input
                              v-model="forms.address.fields.province" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <b-form-group>
                            <label>Country</label>
                            <b-form-select v-model="forms.address.fields.countryId">
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
                            <label>Postal Code</label>
                            <b-form-input
                              v-model="forms.address.fields.postalCode" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <b-form-group>
                            <label>Home Landline/Mobile No.</label>
                            <b-form-input
                              v-model="forms.address.fields.homeLandlineMobileNo" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="12">
                          <b-form-group>
                            <label>Current Address</label>
                            <b-form-textarea
                              rows="3"
                              v-model="forms.address.fields.address" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="12">
                          <b-form-group>
                            <label>Permanent Address</label>
                            <b-form-textarea
                              rows="3"
                              v-model="forms.address.fields.permanentAddress" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </div>
                    <!-- Complete Address -->
                    <!-- Family Background -->
                    <div v-show="forms.activeApplication.fields.applicationStepId === 3">
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
                    <div v-show="forms.activeApplication.fields.applicationStepId === 4">
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
                    <!-- Application -->
                    <div >
                      <div v-show="forms.activeApplication.fields.applicationStepId === 5 && forms.activeApplication.fields.applicationStatusId === 4">
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
                      <div v-show="forms.activeApplication.fields.applicationStepId === 5 && forms.activeApplication.fields.applicationStatusId === 2">
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
                    <!-- Application -->
                  </b-card-body>
                  <template v-slot:footer v-if="forms.activeApplication.fields.applicationStatusId !== 4">
                    <b-button
                      @click="forms.activeApplication.fields.applicationStepId--"
                      :disabled="forms.activeApplication.fields.applicationStepId === 1"
                      class="float-left">
                      Back
                    </b-button>
                    <b-button
                      @click="onUpdateStudent()"
                      variant="outline-primary"
                      class="float-right"
                      :disabled="isProcessing">
                      <v-icon
                        v-if="isProcessing"
                        name="sync"
                        class="mr-2"
                        spin
                      />
                      {{forms.activeApplication.fields.applicationStepId !== 5 ? 'Next' : 'Submit Application'}}
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
import { StudentApi, LevelApi, AuthApi, SchoolYearApi } from '../../mixins/api';
import StageIndicator from '../components/StageIndicator';
import ApprovalIndicator from '../components/ApprovalIndicator';
import { Semesters, ApplicationSteps, Countries, CivilStatuses } from '../../helpers/enum';
import { copyValue } from '../../helpers/extractor';

const studentFields = {
  id: null,
  studentNo: null,
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
  city: null,
  province: null,
  countryId: Countries.PHILIPPINES.id,
  postalCode: null,
  address: null,
  permanentAddress: null,
  homeLandlineMobileNo: null
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

const activeApplicationFields = {
  id: null,
  appliedDate: null,
  schoolYearId: null,
  applicationStatusId : null,
  applicationStepId: null
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
  name: "StudentInfo",
  mixins: [StudentApi, LevelApi, AuthApi, SchoolYearApi ],
  components: {
    StageIndicator,
    ApprovalIndicator
  },
  data() {
    return {
      isLoading: false,
      isApplied: false,
      percentage: 30,
      isProcessing: false,
      forms: {
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
        activeApplication : {
          fields: { ...activeApplicationFields }
        },
        transcript: {
          fields: { ...transcriptFields }
        },
      },
      tables :{
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
        }
      },
      options: {
        levels:{
          items:[]
        },
        courses :{
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
        }
      },
      selectedApprovalStage: 1,
      stages: [
        'Lorem ipsum dolor amet',
        'Lorem ipsum dolor amet',
        'Lorem ipsum dolor amet',
        'Lorem ipsum dolor amet',
        'Lorem ipsum dolor amet'
      ].map((description, idx) => {
        const { name } = ApplicationSteps.values[idx];
        return { name, description }
      }) || [],
      approvalStages: [
        { approvedLabel: 'Application Submitted', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Approved by Registrar', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Approved by Staff', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Done', waitingLabel: 'Waiting for Completion' }
      ]
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
    })
    this.isLoading = false;

    let params = { paginate: false }
    this.getLevelList(params).then(response => {
      const res = response.data
      this.options.levels.items = res
    });
    this.getSchoolYearList(params).then(response => {
      const res = response.data
      this.options.schoolYears.items = res
    });
  },
  methods: {
    onUpdateStudent() {
      const {
        student: { fields: { id: studentId } },
        student: { fields: student },
        address: { fields: address },
        family: { fields: family },
        education: { fields: education },
        transcript: { fields: transcript },
        activeApplication: { fields: activeApplication }
      } = this.forms;

      const { items } = this.tables.subjects
      let subjects = []

      items.forEach(subject => {
				subjects.push({
					subjectId: subject.id
				})
			})
      
      const currentStepIndex = activeApplication.applicationStepId - 1;
      const payloads = [
        student,
        { address },
        { family },
        { education },
        { transcript, subjects }
      ];
      const applicationStepId =
        ApplicationSteps.ACADEMIC_YEAR_APPLICATION.id === activeApplication.applicationStepId
          ? ApplicationSteps.ACADEMIC_YEAR_APPLICATION.id 
          : activeApplication.applicationStepId + 1;

      const applicationStatusId =
        ApplicationSteps.ACADEMIC_YEAR_APPLICATION.id === activeApplication.applicationStepId
          ? 4
          : activeApplication.applicationStatusId;

      const data = {
        ...payloads[currentStepIndex],
        activeApplication: {
          ...activeApplication,
          id: activeApplication.id,
          applicationStepId,
          applicationStatusId
        }
      }

      this.isProcessing = true;
      this.updateStudent(data, studentId).then(({ data }) => {
        copyValue(data.activeApplication, activeApplication);
        this.$set(this.forms.activeApplication, 'fields',  { ...activeApplication })
        this.isProcessing = false;
      }).catch((error) => {
        console.log(error)
        this.isProcessing = false;
      });
    },
    loadCourses() {
      const { fields } = this.forms.transcript;
      const { items } = this.options.levels
      // console.log(fields.levelId)
      fields.schoolCategoryId = items.find(i => i.id == fields.levelId).schoolCategoryId
      fields.courseId = null
      fields.semesterId = null
      const params = { paginate: false }
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
      const { fields } = this.forms.activeApplication
      if (fields.applicationStepId) {
        return ApplicationSteps.getEnum(fields.applicationStepId)
      }
      return { name: '', description: ''}
    }
  },
};
</script>
