<style scoped>
    .my-table {
        display: flex;
        flex-flow: column;
        max-height: 500px;
        overflow-y: auto;
    }
    .btn-circle {
        width: 50px;
        height: 50px;
        padding: 6px 0px;
        border-radius: 25px;
        text-align: center;
        font-size: 12px;
        line-height: 1.42857;
    }
</style>
<template>
    <div><!-- main container -->
        <CRow>
            <CCol lg=4>
                <CButton class="btn-circle" color="primary">1</CButton><span style="font-size: 20px; font-weight:bold;"> Personal Info</span>
            </CCol>
            <CCol lg=8>
                <CCard style="min-height: 600px">
                    <CCardBody v-if="!isLoaded" class="d-flex content-center">
                        <div class="spinner-border" style="width: 5rem; height: 5rem;" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </CCardBody>
                    <CCardBody v-show="isLoaded">
                        <!-- About You -->
                        <div v-show="step==1">
                            <h4>About You</h4>
                            <p>A bit of personal details about you.</p>
                            <CRow class="mt-4">
                                <CCol md=6 >
                                    <CInput 
                                        label="Firstname" 
                                        placeholder="Firstname"
                                        v-model="forms.student.fields.first_name"
                                    />
                                </CCol>
                                <CCol md=6>
                                    <CInput 
                                        label="Middlename" 
                                        placeholder="Middlename"
                                        v-model="forms.student.fields.middle_name"
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol md=6 >
                                    <CInput 
                                        label="Lastname" 
                                        placeholder="Lastname"
                                        v-model="forms.student.fields.last_name"
                                    />
                                </CCol>
                                <CCol md=6>
                                    <CInput 
                                        label="Mobile No." 
                                        placeholder="Mobile No."
                                        v-model="forms.student.fields.mobile_no"
                                    />
                                </CCol>
                            </CRow>
                        </div>
                        <!-- About You -->
                        <!-- Complete Address -->
                        <div v-show="step == 2">
                            <h4>Complete Address</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
                            <CRow>
                                <CCol lg=6>
                                    <CInput
                                        label="City Town"
                                        placeholder="City Town"
                                        v-model="forms.address.fields.city"
                                    />
                                </CCol>
                                <CCol lg=6>
                                    <CInput
                                        label="Province"
                                        placeholder="Province"
                                        v-model="forms.address.fields.province"
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol lg=6>
                                    <CInput
                                        label="Country"
                                        placeholder="Country"
                                        v-model="forms.address.fields.country"
                                    />
                                </CCol>
                                <CCol lg=6>
                                    <CInput
                                        label="Postal Code"
                                        placeholder="Postal Code"
                                        v-model="forms.address.fields.postal_code"
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol lg=12>
                                    <CTextarea
                                        label="Address"
                                        placeholder="Address"
                                        rows=3
                                        v-model="forms.address.fields.address"
                                    />
                                </CCol>
                            </CRow>
                        </div>
                        <!-- Complete Address -->
                        <!-- Family Background -->
                        <div v-show="step == 3">
                            <h4>Family Background</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
                            <CRow>
                                <CCol lg=6>
                                    <CInput 
                                        label="Father"
                                        placeholder="Father"
                                        v-model="forms.family.fields.father_name"
                                    />
                                </CCol>
                                <CCol lg=6>
                                    <CInput 
                                        label="Contact Number"
                                        placeholder="Contact Number"
                                        v-model="forms.family.fields.father_mobile_no"
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol lg=6>
                                    <CInput 
                                        label="Occupation"
                                        placeholder="Occupation"
                                        v-model="forms.family.fields.father_occupation"
                                    />
                                </CCol>
                                <CCol lg=6>
                                    <CInput 
                                        label="Email Address"
                                        placeholder="Email Address"
                                        v-model="forms.family.fields.father_email"
                                    />
                                </CCol>
                            </CRow>
                            <CRow class="mt-3">
                                <CCol lg=6>
                                    <CInput 
                                        label="Mother"
                                        placeholder="Mother"
                                        v-model="forms.family.fields.mother_name"
                                    />
                                </CCol>
                                <CCol lg=6>
                                    <CInput 
                                        label="Contact Number"
                                        placeholder="Contact Number"
                                        v-model="forms.family.fields.mother_mobile_no"
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol lg=6>
                                    <CInput 
                                        label="Occupation"
                                        placeholder="Occupation"
                                        v-model="forms.family.fields.mother_occupation"
                                    />
                                </CCol>
                                <CCol lg=6>
                                    <CInput 
                                        label="Email Address"
                                        placeholder="Email Address"
                                        v-model="forms.family.fields.mother_email"
                                    />
                                </CCol>
                            </CRow>
                        </div>
                        <!-- Family Background -->
                        <!-- Previous Education -->
                        <div v-show="step == 4">
                            <h4>Previous Education</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
                            <CRow>
                                <CCol lg=6>
                                    <CInput 
                                        label="Last School Attended"
                                        placeholder="Last School Attended"
                                    />
                                </CCol>
                                <CCol lg=6>
                                    <CInput 
                                        label="Level"
                                        placeholder="Level"
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol lg=12>
                                    <CInput 
                                        label="Address"
                                        placeholder="Address"
                                    />
                                </CCol>
                            </CRow>
                        </div>
                        <!-- Previous Education -->
                        <!-- Application -->
                        <div v-show="step == 5">
                            <h4>Application</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
                            <CRow>
                                <CCol lg=6>
                                    <CSelect 
                                        label="Level"
                                        placeholder="Level"
                                    />
                                </CCol>
                                <CCol lg=6>
                                    <CSelect 
                                        label="Course"
                                        placeholder="Course"
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol lg=12>
                                    <CDataTable
                                        class="my-table"
                                        style="border-top: none"
                                        responsive
                                        :fields="subjects.fields"
                                        :items.sync="subjects.items"
                                    >
                                        <template #subject_name="{item}">
                                            <td>
                                                <span>{{item.subject_name}}</span><br>
                                                <small>{{item.description}}</small>
                                            </td>
                                        </template>
                                    </CDataTable>
                                </CCol>
                            </CRow>
                        </div>
                        <!-- Previous Education -->
                    </CCardBody>
                    <CCardFooter>
                        <CButton @click="step--" :disabled="step==1" class="float-left">Back</CButton>
                        <CButton @click="updateStudent()" color="outline-primary" class="float-right">Next</CButton>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    </div> <!-- main container -->
</template>
<script>
export default {
    name: 'StudentInfo',
    data() {
        return {
            isLoaded: false,
            step: 2,
            forms: {
                student: {
                    fields: {
                        id: null,
                        first_name: null,
                        middle_name: null,
                        last_name: null,
                        mobile_no: null,
                    }
                },
                address: {
                    fields:{
                        id: null,
                        city: null,
                        province: null,
                        country: null,
                        postal_code: null,
                        address: null
                    },
                 },
                family: {
                    fields: {
                        father_name: null,
                        father_occupation: null,
                        father_mobile_no: null,
                        father_email: null,
                        mother_name: null,
                        mother_occupation: null,
                        mother_mobile_no: null,
                        mother_email: null
                    }
                }
            },
            subjects: {
                fields: [
                    {
                        key: 'subject_name',
                        label: 'SUBJECTS',
                        _classes: 'align-middle',
                        _style :  'width: 80%'
                    },
                    {
                        key: 'units',
                        label: 'UNITS',
                        _classes: 'align-middle text-center',
                    },
                ],
                items: [
                    {
                        subject_name: 'Fundamentals of Programming',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
                        units: '3'
                    },
                    {
                        subject_name: 'Data Structure',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
                        units: '3'
                    },
                    {
                        subject_name: 'Introduction to Networking',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
                        units: '3'
                    }
                ]
            },
        }
    },
    created() {
        this.$http.get('api/v1/studentinfo', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        }).then(response => {
            const res = response.data

            for (var key in this.forms.student.fields) {
                this.forms.student.fields[key] = res[key]
            }

            if(res.address){
                this.step++
                for (var key in this.forms.address.fields) {
                    this.forms.address.fields[key] = res.address[key]
                }
            }

            if(res.family){
                this.step++
                for (var key in this.forms.family.fields) {
                    this.forms.family.fields[key] = res.family[key]
                }
            }
            this.isLoaded = true
        })
    },
    methods: {
        updateStudent(){
            var child = ""
            if(this.step == 1){
                this.$http.put('api/v1/students/'+ this.forms.student.fields.id, this.forms.student.fields, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('access_token')
                    }
                }).then(response => {
                    console.log(response)
                    if(this.step != 5)
                        this.step++
                })
            }
            else {
                if (this.step == 2) {
                    child = "address"
                }
                else if (this.step == 3) {
                    child = "family"
                }
                this.$http.put('api/v1/studentinfo/' + child + '/' + this.forms.student.fields.id, this.forms[child].fields, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('access_token')
                    }
                }).then(response => {
                    console.log(response)
                    if(this.step != 5)
                        this.step++
                })
            }
        }
    }
}
</script>