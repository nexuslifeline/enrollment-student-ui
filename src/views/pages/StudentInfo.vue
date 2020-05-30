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
                  <StageIndicator :stages="stages" :activeIndex="selectedIndex" />
                </div>
              </b-col>
              <b-col md="8">
                <b-card style="min-height: 600px">
                  <b-card-body>
                    <!-- About You -->
                    <div v-show="selectedIndex === 0">
                      <h4>About You</h4>
                      <p>A bit of personal details about you.</p>
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
                    <div v-show="selectedIndex === 1">
                      <h4>Complete Address</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
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
                    <div v-show="selectedIndex === 2">
                      <h4>Family Background</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
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
                    <div v-show="selectedIndex === 3">
                      <h4>Previous Education</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
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
                    <div v-show="selectedIndex === 4 && !isApplied">
                      <h4>Application</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
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
                        <b-col md="6">
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
                        </b-col>
                        <b-col md="6">
                          <b-form-group>
                            <label>Semester</label>
                            <b-form-select @input="loadSubjects()" v-model='forms.transcript.fields.semesterId' :disabled='options.courses.items.length === 0'>
                              <template v-slot:first>
                                <b-form-select-option :value='null' disabled>-- Semester --</b-form-select-option>
                              </template>
                              <b-form-select-option v-for='semester in options.semesters.items' :key='semester.id' :value='semester.id'>
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
                    <div v-show="selectedIndex === 4 && isApplied">
                      <h4>Application</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
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
                    <!-- Application -->
                  </b-card-body>
                  <template v-if="!isApplied" v-slot:footer>
                    <b-button @click="selectedIndex--" :disabled="selectedIndex===0" class="float-left">Back</b-button>
                    <b-button
                      @click="onUpdateStudent()" 
                      variant="outline-primary" 
                      class="float-right">
                        {{ selectedIndex != 4 ? 'Next' : 'Submit Application'}}
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
import { StudentApi, LevelApi, AuthApi, SchoolYearApi, SemesterApi } from "../../mixins/api"
import StageIndicator from '../components/StageIndicator'
import ApprovalIndicator from '../components/ApprovalIndicator'
export default {
  name: "StudentInfo",
  mixins: [StudentApi, LevelApi, AuthApi, SchoolYearApi, SemesterApi],
  components: {
    StageIndicator,
    ApprovalIndicator
  },
  data() {
    return {
      isLoaded: false,
      isApplied: false,
      percentage: 30,
      forms: {
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
            id: null,
            city: null,
            province: null,
            country: null,
            postalCode: null,
            address: null
          }
        },
        family: {
          fields: {
            id: null,
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
            id: null,
            lastSchoolAttended: null,
            lastSchoolAddress: null,
            year: null
          }
        },
        applications : {
          fields: {
            id:null,
            appliedDate: null,
            applicationStatusId: 2
          }
        },
        transcript: {
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
          items:[]
        },
        semesters: {
          items: []
        },
        schoolYears: {
          items: []
        }
      },
      selectedIndex: null,
      selectedApprovalStage: 1,
      stages: [
        {
          header: "Personal Info",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit psum dolor sit amet psum dolor sit amet"
        },
        {
          header: "Complete Address",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit psum dolor sit amet psum dolor sit amet"
        },
        {
          header: "Family Background",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {
          header: "Previous Education",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {
          header: "Application",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        },
        {
          header: "Billing",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
        }
      ],
      approvalStages: [
        { approvedLabel: 'Application Submitted', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Approved by Registrar', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Approved by Staff', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Done', waitingLabel: 'Waiting for Completion' }
      ]

    };
  },
  created() {
    this.isLoaded = true;
    this.getUser().then(response => {
      const res = response.data.userable
        this.getStudent(res.id).then(response => {
          const resStud = response.data
          let counter = 1;
          for (let key in this.forms.student.fields) {
            this.forms.student.fields[key] = resStud[key];
          }

          if (resStud.address) {
            counter++
            for (let key in this.forms.address.fields) {
              this.forms.address.fields[key] = resStud.address[key];
            }
          }

          if (resStud.family) {
            counter++
            for (let key in this.forms.family.fields) {
              this.forms.family.fields[key] = resStud.family[key];
            }
          }

          if (resStud.education) {
            counter++
            for (let key in this.forms.education.fields) {
              this.forms.education.fields[key] = resStud.education[key];
            }
          }

          if (resStud.transcripts.length > 0) {
            const transcript = resStud.transcripts[0]
            this.isApplied=true
            // for (let key in this.forms.transcript.fields) {
            //   this.forms.transcript.fields[key] = transcript[key];
            // }
            // for (let key in this.forms.applications.fields) {
            //   this.forms.applications.fields[key] = transcript.application[key];
            // }
            
          }
          this.selectedIndex = counter
          this.isLoaded = false
        })
    })

    let params = { paginate: false }
    this.getLevelList(params).then(response => {
      const res = response.data
      this.options.levels.items = res
    });
    this.getSemesterList(params).then(response => {
      const res = response.data
      this.options.semesters.items = res
    });
    this.getSchoolYearList(params).then(response => {
      const res = response.data
      this.options.schoolYears.items = res
    });
  },
  methods: {
    onUpdateStudent() {
      let steps = [{ step : 1, form: 'address' }, { step : 2, form: 'family' }, { step : 3, form: 'education' }, { step : 4, form: 'applications' }]
      let data = {}
      for (let key in this.forms.student.fields) {
        data[key] = this.forms.student.fields[key]
      }
      
      steps.forEach(element => {
        if (element.step === this.selectedIndex) {
          if (element.step === 4) {
            this.forms[element.form].fields.appliedDate = moment(new Date).format('YYYY-MM-DD hh:mm:ss')
            const { fields } = this.forms.transcript
            fields.studentId = this.forms.student.fields.id
            fields.schoolCategoryId = this.options.levels.items.find(l => l.id = fields.levelId).schoolCategoryId
            this.$set(data, 'transcript', fields)

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

      this.updateStudent(data, this.forms.student.fields.id).then(response => {
        const res = response.data
        if (this.selectedIndex < 4) {
          this.selectedIndex++
        } else { 
          this.isApplied = true
        }
      })
    },
    loadCourses() {
      const { fields } = this.forms.transcript;
      fields.courseId = null
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
    }
  }
};
</script>
