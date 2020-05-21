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
                    <CCardBody>
                        <!-- Complete Address -->
                        <div v-show="step == 2">
                            <h4>Complete Address</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
                            <CRow>
                                <CCol lg=6>
                                    <CInput
                                        label="City Town"
                                        placeholder="City Town"
                                    />
                                </CCol>
                                <CCol lg=6>
                                    <CInput
                                        label="Province"
                                        placeholder="Province"
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol lg=6>
                                    <CInput
                                        label="Country"
                                        placeholder="Country"
                                    />
                                </CCol>
                                <CCol lg=6>
                                    <CInput
                                        label="Postal Code"
                                        placeholder="Postal Code"
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol lg=12>
                                    <CTextarea
                                        label="Address"
                                        placeholder="Address"
                                        rows=3
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
                                    />
                                </CCol>
                                <CCol lg=6>
                                    <CInput 
                                        label="Contact Number"
                                        placeholder="Contact Number"
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol lg=6>
                                    <CInput 
                                        label="Occupation"
                                        placeholder="Occupation"
                                    />
                                </CCol>
                                <CCol lg=6>
                                    <CInput 
                                        label="Email Address"
                                        placeholder="Email Address"
                                    />
                                </CCol>
                            </CRow>
                            <CRow class="mt-3">
                                <CCol lg=6>
                                    <CInput 
                                        label="Mother"
                                        placeholder="Mother"
                                    />
                                </CCol>
                                <CCol lg=6>
                                    <CInput 
                                        label="Contact Number"
                                        placeholder="Contact Number"
                                    />
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol lg=6>
                                    <CInput 
                                        label="Occupation"
                                        placeholder="Occupation"
                                    />
                                </CCol>
                                <CCol lg=6>
                                    <CInput 
                                        label="Email Address"
                                        placeholder="Email Address"
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
                                    <b-form-group>
                                        <CSelect 
                                            label="Level"
                                            placeholder="Level"
                                        />
                                    </b-form-group>
                                </CCol>
                                <CCol lg=6>
                                    <CInput 
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
                        <CButton @click="step--" :disabled="step==2" class="float-left">Back</CButton>
                        <CButton @click="step++" color="outline-primary" class="float-right">Next</CButton>
                    </CCardFooter>
                </CCard>
            </CCol>
        </CRow>
    </div> <!-- main container -->
</template>
<script>
export default {
    data() {
        return {
            step: 2,
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
    }
}
</script>