<template>
  <div>
    <!-- main container -->
    <b-row>
      <b-col md="12">
        <b-card>
          <b-row>
            <b-col md=4>
              <div class="left-pane">
                <StageIndicator :stages="stages" :activeIndex="selectedIndex" @selectedItem="onSelectStage"/>
              </div>
            </b-col>
            <b-col md=8>
              <b-card style="min-height: 600px">
                <b-card-body v-show="isLoaded">
                  <!-- About You -->
                  <div v-show="selectedIndex == 0">
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
                  <div v-show="selectedIndex == 1">
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
                  <div v-show="selectedIndex == 2">
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
                  <div v-show="selectedIndex == 3">
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
                  <div v-show="selectedIndex == 4">
                    <h4>Application</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
                    <b-row>
                      <b-col md="6">
                        <b-form-group>
                          <label>Level</label>
                          <b-form-select @input="loadCourses()" v-model='forms.application.fields.levelId' :disabled='options.levels.items.length == 0'>
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
                          <b-form-select @input="loadSubjects()" v-model='forms.application.fields.courseId' :disabled='options.courses.items.length == 0'>
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
                      <b-col md="12">
                        <b-table
                          sticky-header="300px"
                          head-variant="light"
                          responsive small hover outlined show-empty
                          :fields="tables.subjects.fields"
                          :items.sync="tables.subjects.items"
                          :busy="tables.subjects.isBusy"
                        >
                          <template v-slot:cell(name)="data">
                              <span>{{data.item.name}}</span><br>
                              <small>{{data.item.description}}</small>
                          </template>
                        </b-table>
                      </b-col>
                    </b-row>
                  </div>
                  <!-- Previous Education -->
                </b-card-body>
                <template v-slot:footer>
                  <b-button @click="selectedIndex--" :disabled="selectedIndex==0" class="float-left">Back</b-button>
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
  </div>
  <!-- main container -->
</template>
<script>
import { StudentApi, LevelApi, AuthApi } from "../../mixins/api"
import StageIndicator from '../components/StageIndicator'
export default {
  name: "StudentInfo",
  mixins: [StudentApi, LevelApi, AuthApi],
  components: {
    StageIndicator
  },
  data() {
    return {
      isLoaded: false,
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
        application : {
          fields: {
            id:null,
            semesterId: null,
            levelId: null,
            courseId: null
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
              tdClass: "align-middle text-center"
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
        }
      },
      selectedIndex: 0,
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
      ]
      
    };
  },
  created() {
    this.getUser().then(response => {
      const res = response.data.userable
        this.getStudent(res.id).then(response => {
          const resStud = response.data
          for (var key in this.forms.student.fields) {
            this.forms.student.fields[key] = resStud[key];
          }

          if (resStud.address) {
            this.selectedIndex++
            for (var key in this.forms.address.fields) {
              this.forms.address.fields[key] = resStud.address[key];
            }
          }

          if (resStud.family) {
            this.selectedIndex++
            for (var key in this.forms.family.fields) {
              this.forms.family.fields[key] = resStud.family[key];
            }
          }

          if (resStud.education) {
            this.selectedIndex++
            for (var key in this.forms.education.fields) {
              this.forms.education.fields[key] = resStud.education[key];
            }
          }
          this.isLoaded = true;
        })
    })

    var params = { paginate: false }
    this.getLevelList(params).then(response => {
      const res = response.data
      this.options.levels.items = res
    });
  },
  methods: {
    onUpdateStudent() {
      var steps = [{ step : 1, form: 'address' }, { step : 2, form: 'family' }, { step : 3, form: 'education' }, { step : 4, form: 'application' }]
      var data = {}
      for (var key in this.forms.student.fields) {
        data[key] = this.forms.student.fields[key]
      }

      steps.forEach(element => {
        if(element.step == this.selectedIndex){
          this.$set(data, element.form, this.forms[element.form].fields)
        }
      });

      if(this.selectedIndex < 5){
        this.selectedIndex++
      }
      
      this.updateStudent(data, this.forms.student.fields.id).then(response =>{
        const res = response.data
        console.log(data)
      })
    },
    loadCourses(){ 
      this.forms.application.fields.courseId = null
      var params = { paginate: false } 
      this.getCoursesOfLevelList(this.forms.application.fields.levelId, params).then(response => {
        const res = response.data
        this.options.courses.items = res
        if(res.length == 0){
          this.loadSubjects()
          return
        }
        this.tables.subjects.items = []
        
      });
    },
    loadSubjects(){
      this.tables.subjects.isBusy = true
      var params = { courseId : this.forms.application.fields.courseId, semesterId : this.forms.application.fields.semesterId , paginate : false} 
      this.getSubjectsOfLevelList(this.forms.application.fields.levelId, params)
        .then(response => {
          const res = response.data
          this.tables.subjects.items = res
          this.tables.subjects.isBusy = false
      });
    },
    onSelectStage(idx) {
      this.selectedIndex = idx;
    }
  }
};
</script>