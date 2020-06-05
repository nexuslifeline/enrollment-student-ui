<template>
  <div>
    <!-- main container -->
    <b-overlay :show='isLoaded' rounded="sm">
      <b-row>
        <b-col md="12">
          <b-card>
            <b-row>
              <b-col md="4">
                <div class="left-pane">
                  <StageIndicator 
                    :stages="stages.values" 
                    :activeIndex="forms.activeAdmission.fields.admissionStepId" />
                </div>
              </b-col>
              <b-col md="8">
                <b-card style="min-height: 600px">
                  <b-card-body>
                    <h4>{{heading.name}}</h4> 
                    <p>{{heading.description}}</p>
                    <!-- About You -->
                    <div v-show="forms.activeAdmission.fields.admissionStepId === 1">
                      <b-row class="mt-4">
                        <b-col md="6">
                          <b-form-group>
                            <label>Firstname</label>
                            <b-form-input
                              placeholder="Firstname"
                              v-model="forms.student.fields.firstName" />
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Middlename</label>
                            <b-form-input
                              placeholder="Middlename"
                              v-model="forms.student.fields.middleName" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <b-form-group>
                            <label>Lastname</label>
                            <b-form-input
                              placeholder="Lastname"
                              v-model="forms.student.fields.lastName" />
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Mobile No.</label>
                            <b-form-input
                              placeholder="Mobile No."
                              v-model="forms.student.fields.mobileNo" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </div>
                    <!-- About You -->
                    <!-- Complete Address -->
                    <div v-show="forms.activeAdmission.fields.admissionStepId === 2">
                      <b-row>
                        <b-col md="6">
                          <b-form-group>
                            <label>City Town</label>
                            <b-form-input
                              placeholder="City Town"
                              v-model="forms.address.fields.city" />
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Province</label>
                            <b-form-input
                              placeholder="Province"
                              v-model="forms.address.fields.province" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <b-form-group>
                            <label>Country</label>
                            <b-form-input
                              placeholder="Country"
                              v-model="forms.address.fields.country" />
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Postal Code</label>
                            <b-form-input
                              placeholder="Postal Code"
                              v-model="forms.address.fields.postalCode" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="12">
                          <b-form-group>
                            <label>Address</label>
                            <b-form-textarea
                              placeholder="Address"
                              rows="3"
                              v-model="forms.address.fields.address" />
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
                              placeholder="Father"
                              v-model="forms.family.fields.fatherName" />
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Contact No.</label>
                            <b-form-input
                              placeholder="Contact No"
                              v-model="forms.family.fields.fatherMobileNo" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <b-form-group>
                            <label>Occupation</label>
                            <b-form-input
                              placeholder="Occupation"
                              v-model="forms.family.fields.fatherOccupation" />
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Email Address</label>
                            <b-form-input
                              placeholder="Email Address"
                              v-model="forms.family.fields.fatherEmail" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row class="mt-3">
                        <b-col md="6">
                          <b-form-group>
                            <label>Mother</label>
                            <b-form-input
                              placeholder="Mother"
                              v-model="forms.family.fields.motherName" />
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Contact No.</label>
                            <b-form-input
                              placeholder="Contact No"
                              v-model="forms.family.fields.motherMobileNo" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <b-form-group>
                            <label>Occupation</label>
                            <b-form-input
                              placeholder="Occupation"
                              v-model="forms.family.fields.motherOccupation" />
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Email Address</label>
                            <b-form-input
                              placeholder="Email Address"
                              v-model="forms.family.fields.motherEmail" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </div>
                    <!-- Family Background -->
                    <!-- Previous Education -->
                    <div v-show="forms.activeAdmission.fields.admissionStepId === 4">
                      <b-row>
                        <b-col md="6">
                          <b-form-group>
                            <label>Last School Attended</label>
                            <b-form-input
                              placeholder="Last School Attended"
                              v-model="forms.education.fields.lastSchoolAttended" />
                          </b-form-group>
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Level</label>
                            <b-form-input
                              placeholder="Level"
                              v-model="forms.education.fields.year" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="12">
                          <b-form-group>
                            <label>Last School Address</label>
                            <b-form-input
                              placeholder="Last School Address"
                              v-model="forms.education.fields.lastSchoolAddress" />
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </div>
                    <!-- Previous Education -->
                    <!-- Application -->
                    <div >
                      <div v-show="forms.activeAdmission.fields.admissionStepId === 5 && isApplied">
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
                      <div v-show="forms.activeAdmission.fields.admissionStepId === 5 && !isApplied">
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
                  <template v-if="!isApplied" v-slot:footer>
                    <b-button @click="forms.activeAdmission.fields.admissionStepId--" :disabled="forms.activeAdmission.fields.admissionStepId===1" class="float-left">Back</b-button>
                    <b-button
                      @click="onUpdateStudent()" 
                      variant="outline-primary" 
                      class="float-right">
                        {{ forms.activeAdmission.fields.admissionStepId !== 5 ? 'Next' : 'Submit Application'}}
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
import { StudentApi, LevelApi, AuthApi, SchoolYearApi } from "../../mixins/api"
import StageIndicator from '../components/StageIndicator'
import { Semesters, AdmissionSteps } from '../../helpers/enum'
import ApprovalIndicator from '../components/ApprovalIndicator'
export default {
    name : "NewStudentInfo",
    mixins: [StudentApi, LevelApi, AuthApi, SchoolYearApi ],
    components: {
      StageIndicator, ApprovalIndicator
    },
    data(){
      return{
        isLoaded: false,
        isApplied: false,
        percentage: 30,
        forms:  {
          student: {
            fields: {
              id: null,
              firstName: null,
              middleName: null,
              lastName: null,
              mobileNo: null
            }
          },
          address: {
            fields: {
              city: null,
              province: null,
              country: null,
              postalCode: null,
              address: null
            }
          },
          family: {
            fields: {
              fatherName: null,
              fatherOccupation: null,
              fatherMobileNo: null,
              fatherEmail: null,
              motherName: null,
              motherOccupation: null,
              motherMobileNo: null,
              motherEmail: null
            }
          },
          education: {
            fields: {
              lastSchoolAttended: null,
              lastSchoolAddress: null,
              year: null
            }
          },
          activeAdmission: {
            fields: {
              appliedDate: null,
              schoolYearId: null,
              applicationStatusId : null,
              admissionStepId: null
            }
          },
          transcript : {
            fields: {
              studentId: null,
              semesterId: null,
              levelId: null,
              courseId: null,
              schoolYearId: null,
              schoolCategoryId: null
            }
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
          }
        },
        options: {
          levels:{
            items:[]
          },
          courses :{
            items:[]
          },
          semesters :{
            items: Semesters
          }
        },
        selectedApprovalStage: 1,
        stages: AdmissionSteps,
        approvalStages: [
          { approvedLabel: 'Application Submitted', waitingLabel: 'Waiting for Approval' },
          { approvedLabel: 'Approved by Registrar', waitingLabel: 'Waiting for Approval' },
          { approvedLabel: 'Approved by Staff', waitingLabel: 'Waiting for Approval' },
          { approvedLabel: 'Done', waitingLabel: 'Waiting for Completion' }
        ]
      }
    },
    created(){
      this.isLoaded = true;
      this.getUser().then(response => {
        const res = response.data.userable
          this.getStudent(res.id).then(response => {
            const res = response.data
            for (let key in this.forms.student.fields) {
              this.forms.student.fields[key] = res[key];
            }

            if (res.address) {
              for (let key in this.forms.address.fields) {
                this.forms.address.fields[key] = res.address[key];
              }
            }

            if (res.family) {
              for (let key in this.forms.family.fields) {
                this.forms.family.fields[key] = res.family[key];
              }
            }

            if (res.education) {
              for (let key in this.forms.education.fields) {
                this.forms.education.fields[key] = res.education[key];
              }
            }

            if (res.activeAdmission) {
              // this.isApplied=true
              for (let key in this.forms.transcript.fields) {
                this.forms.transcript.fields[key] = res.activeAdmission.transcript[key];
              }
              for (let key in this.forms.activeAdmission.fields) {
                this.forms.activeAdmission.fields[key] = res.activeAdmission[key];
                const { fields } = this.forms.activeAdmission
                if (fields.appliedDate) {
                  this.isApplied = true
                }
              }
              
            }
            // this.forms.activeAdmission.fields.admissionStepId = counter
            this.isLoaded = false
          })
      })

      let params = { paginate: false }
      this.getLevelList(params).then(response => {
        const res = response.data
        this.options.levels.items = res
      })
    },
    methods: {
      onUpdateStudent() {
        let steps = [{ step : 2, form: 'address' }, { step : 3, form: 'family' }, { step : 4, form: 'education' }, { step : 5, form: 'transcript' }]
        let data = {}
        for (let key in this.forms.student.fields) {
          data[key] = this.forms.student.fields[key]
        }

        const { fields } = this.forms.activeAdmission

        //form according to step
        steps.forEach(element => {
          if (element.step === fields.admissionStepId) {
            if (element.step === 5) {
              this.forms.activeAdmission.fields.appliedDate = moment(new Date).format('YYYY-MM-DD hh:mm:ss')
              const { fields } = this.forms.transcript
              fields.studentId = this.forms.student.fields.id
              fields.schoolCategoryId = this.options.levels.items.find(l => l.id = fields.levelId).schoolCategoryId

              let subjects = []
              this.tables.subjects.items.forEach(s => {
                subjects.push({
                  subject_id: s.id
                })
              })

              this.$set(data, 'subjects', subjects)
            }
            this.$set(data, element.form, this.forms[element.form].fields)
          }
        });

        //application form
        if (fields.admissionStepId < 5) {
          fields.admissionStepId++
        }
        
        this.$set(data, 'activeAdmission', fields)

        //update
        this.updateStudent(data, this.forms.student.fields.id).then(response => {
          const res = response.data
          const { appliedDate } = res.activeAdmission
          if (appliedDate) {
            this.isApplied = true
          } 
        })
      },
      loadCourses() {
        const { fields } = this.forms.transcript;
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
    totalUnits(){
      let totalUnits = 0
      this.tables.subjects.items.forEach(i => {
        totalUnits += i.units
      })
      return totalUnits
    },
    heading(){
      const { fields } = this.forms.activeAdmission
      if (fields.admissionStepId) {
        return this.stages.getEnum(fields.admissionStepId)
      }
      return { name: '', description: ''}
    }
  }
}
</script>