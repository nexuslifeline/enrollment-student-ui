<template>
   <div class="c-page-content">
    <div class="main-container">
      <div class="left-pane">
        <p class="sub-nav__title">Profile</p>
        <ul class="sub-nav">
          <li
            v-for="(item, idx) in navItems"
            @click="selectedNavIndex = idx"
            :key="idx"
            class="sub-nav__item"
            :class="{ active: idx === selectedNavIndex }"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
      <div class="right-pane">
        <div v-if="selectedNavIndex === 0" class="right-pane__content">
          <b-row>
            <b-col md=12>
              <div class="content-header">
                <div class="content-title">Personal Details</div>
                <div class="content-sub-title">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, aperiam?</div>
              </div>
              <div class="profile-photo-container">
                <div class="profile-photo">
                  <PhotoViewer
                    @onPhotoChange="onPhotoChange"
                    @onPhotoRemove="onPhotoRemove"
                    :imageUrl="studentPhotoUrl"
                    :isBusy="isProfilePhotoBusy"
                  />
                </div>
              </div>
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
              <b-form-group>
                <label class="required">Birthdate</label>
                <b-form-input type="date"
                  v-model="forms.student.fields.birthDate"
                  :state="forms.student.states.birthDate" />
                <b-form-invalid-feedback>
                  {{forms.student.errors.birthDate}}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <label class="required">Email</label>
                <b-form-input
                  v-model="forms.student.fields.email"
                  :state="forms.student.states.email"
                  debounce="500"/>
                <b-form-invalid-feedback>
                  {{forms.student.errors.email}}
                </b-form-invalid-feedback>
              </b-form-group>
              <b-form-group>
                <label>Mobile No.</label>
                <b-form-input
                  v-model="forms.student.fields.mobileNo"
                  debounce="500"/>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md=12>
              <div class="content-header address">
                <div class="content-title">Address</div>
                <div class="content-sub-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis ratione, beatae unde asperiores nemo.</div>
              </div>
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
            </b-col>
          </b-row>
          <b-row>
            <b-col md=12>
              <div class="content-header family">
                <div class="content-title">Family Details</div>
                <div class="content-sub-title">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, aperiam?</div>
              </div>
              <b-row>
                <b-col md=12>
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
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </div>
        <div v-if="selectedNavIndex === 1" class="right-pane__content">
           <div class="content-header">
            <div class="content-title">Account Details</div>
            <div class="content-sub-title">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, aperiam?</div>
          </div>
          <b-row>
            <b-col md=12>
              <b-form-group >
                <label class="required">Username</label>
                <b-form-input
                  disabled
                  ref="username"
                  v-model="forms.user.fields.username"
                  :state="forms.user.states.userUsername"
                  debounce="500" />
                <b-form-invalid-feedback>
                  {{forms.user.errors.userUsername}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md=12>
              <p class="change-password-label">Change Password</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col md=12>
              <b-form-group >
                <label class="required">Old Password</label>
                <b-form-input
                  type="password"
                  v-model="forms.user.fields.oldPassword"
                  :state="forms.user.states.userOldPassword"
                  debounce="500" />
                <b-form-invalid-feedback>
                  {{forms.user.errors.userOldPassword}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md=12>
              <b-form-group >
                <label class="required">Password</label>
                <b-form-input
                  type="password"
                  v-model="forms.user.fields.password"
                  :state="forms.user.states.userPassword"
                  debounce="500" />
                <b-form-invalid-feedback>
                  {{forms.user.errors.userPassword}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md=12>
              <b-form-group >
                <label class="required">Confirm Password</label>
                <b-form-input
                  type="password"
                  v-model="forms.user.fields.passwordConfirmation"
                  debounce="500"/>
              </b-form-group>
            </b-col>
          </b-row>
        </div>
        <!-- <div v-if="selectedNavIndex === 0">
          <div class="personal-details">
            <div class="profile-info__container">
              <div class="nav-content" id="nav-content1">
                <div class="content-header personal">
                  <div class="content-title">Personal Details</div>
                  <div class="content-sub-title">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, aperiam?</div>
                </div>
                <b-row>
                <b-col md="4">
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
                  <b-form-group>
                    <label class="required">Birthdate</label>
                    <b-form-input type="date"
                      v-model="forms.student.fields.birthDate"
                      :state="forms.student.states.birthDate" />
                    <b-form-invalid-feedback>
                      {{forms.student.errors.birthDate}}
                    </b-form-invalid-feedback>
                  </b-form-group>
                  <b-form-group>
                    <label>Mobile No.</label>
                    <b-form-input
                      v-model="forms.student.fields.mobileNo"
                      debounce="500"/>
                  </b-form-group>
                </b-col>
                </b-row>
                <div class="content-header address">
                  <div class="content-title">Address</div>
                  <div class="content-sub-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis reiciendis ratione, beatae unde asperiores nemo.</div>
                </div>
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
                <div class="content-header family">
                  <div class="content-title">Family Details</div>
                  <div class="content-sub-title">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, aperiam?</div>
                </div>
                <b-row>
                  <b-col md=12>
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
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selectedNavIndex === 1" class="nav-content">
         <div class="content-header account">
            <div class="content-title">Account Details</div>
            <div class="content-sub-title">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, aperiam?</div>
          </div>
          <b-row>
            <b-col md=6>
              <b-form-group >
                <label class="required">Email</label>
                <b-form-input
                  ref="username"
                  v-model="forms.user.fields.username"
                  :state="forms.user.states.userUsername"
                  debounce="500" />
                <b-form-invalid-feedback>
                  {{forms.user.errors.userUsername}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md=6>
              <b-form-group >
                <label class="required">Password</label>
                <b-form-input
                  type="password"
                  v-model="forms.user.fields.password"
                  :state="forms.user.states.userPassword"
                  debounce="500" />
                <b-form-invalid-feedback>
                  {{forms.user.errors.userPassword}}
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col md=6>
              <b-form-group >
                <label class="required">Confirm Password</label>
                <b-form-input
                  type="password"
                  v-model="forms.user.fields.passwordConfirmation"
                  debounce="500"/>
              </b-form-group>
            </b-col>
          </b-row>
        </div> -->
        <div class="action-bar">
          <b-button
            class="btn-save float-right"
            variant="outline-primary"
            @click="onStudentUpdate()"
            :disabled="isProcessing"
          >
            <v-icon v-if="isProcessing" name="sync" class="mr-2" spin />
            Save
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const studentFields = {
  id: null,
  studentNo: null,
  firstName: null,
  middleName: null,
  lastName: null,
  mobileNo: null,
  birthDate: null,
  civilStatusId: null,
  name: null,
  currentAddress: null,
  email: null,
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

const userFields = {
  username: null,
  password: null,
  oldPassword: null,
  passwordConfirmation: null,
}

const userErrorFields = {
  userUsername: null,
  userOldPassword: null,
  userPassword: null,
}

import { Countries } from "../../../helpers/enum";
import { validate, reset, showNotification, clear } from "../../../helpers/forms";
import { StudentApi } from '../../../mixins/api'
import { copyValue } from "../../../helpers/extractor";
import PhotoViewer from '../../components/PhotoViewer'
import ProfileMaker from '../../components/ProfileMaker'
import format from 'date-fns/format'

export default {
  name: 'MyProfile',
  mixins: [ StudentApi ],
  components: { PhotoViewer, ProfileMaker } ,
  data() {
    return {
      navItems: [
        {
          label: 'Personal Details',
        },
        {
          label: 'Account Setting',
        },
      ],
      selectedNavIndex: 0,
      Countries: Countries,
      studentPhotoUrl: null,
      isProfilePhotoBusy: false,
      isProcessing: false,
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
        user: {
          fields: { ...userFields },
          states: { ...userErrorFields },
          errors: { ...userErrorFields }
        },
      },
      options: {
        countries: {
          items: Countries
        },
      }
    }
  },
  created() {
    const studentId = this.$store.state.user.id;
     this.getStudent(studentId).then(({ data: student }) => {
       console.log(student)
      Object.keys(this.forms).forEach((key) => {
        const source = student[key] || student;
        if (source) {
          copyValue(source, this.forms[key].fields);
        }

        if(student.photo){
          this.studentPhotoUrl = process.env.VUE_APP_PUBLIC_PHOTO_URL + student.photo.hashName
        }

      })
     })
  },
  methods: {
    onNavSelected(idx) {
      this.selectedNavIndex = idx
    },
    onPhotoChange(file) {
      this.isProfilePhotoBusy = true
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
    onUploadClick(e) {
      this.$refs.photoViewer.onBrowseClick(e)
    },
    onStudentUpdate() {
      this.isProcessing = true
      const {
        student: { fields: { id: studentId } },
        student,
        address,
        family,
        user,
      } = this.forms;

      const formsToValidate = [
        student,
        address,
        family,
        user
      ]

      let payLoad = { }
      if (this.selectedNavIndex === 0) {
        //personal details
        payLoad = {
          ...student.fields,
          address: { ...address.fields },
          family: { ...family.fields },
        }
      }
      else if (this.selectedNavIndex === 1) {
        //personal details
        payLoad = {
          id: studentId,
          email: user.fields.username,
          user: { ...user.fields }
        }
      }

      formsToValidate.forEach(form => {
        if (form)
        reset(form)
      })

      this.updateStudent(payLoad, studentId).then(({ data }) => {


        copyValue(data, this.forms.student)
        copyValue(data.address, this.forms.address)
        copyValue(data.family, this.forms.family)
        copyValue(data.user, this.forms.user)

        showNotification(this, 'success', 'Changes has been saved.')
        this.forms.user.fields.password = null
        this.forms.user.fields.passwordConfirmation = null
        this.isProcessing = false
      }).catch((error) => {
        const { errors } = error.response.data;
        validate(this.forms.student, errors)
        validate(this.forms.address, errors)
        validate(this.forms.family, errors)
        validate(this.forms.user, errors)
        this.isProcessing = false;
        showNotification(this, 'danger', 'Please make sure all inputted data are correct.')
      });

    }
  },
  computed: {
    formattedBirthdate() {
      const { birthDate } = this.forms.student.fields
      if(birthDate)
      return format(new Date(birthDate), 'MMMM dd, yyyy')

      return ''
    },
    studentName() {
      return this.forms.student.fields.name
    }
  }
}
</script>

<style lang="scss" scoped>

@import "../../../assets/scss/shared.scss";

.main-container {
  height: 100%;
  display: flex;
  @include for-size(phone-only) {
    flex-direction: column;
    padding: 20px 20px 0 20px;
  }
}

.sub-nav {
  list-style: none;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
}

.sub-nav__item {
  margin-bottom: 10px;
  padding: 6px 20px;

  &.active {
    background-color: $light-blue-10;
    border-radius: 3px;

    .sub-nav__link {
      color: $brand-primary;
      font-weight: 500;
    }
  }
}

.sub-nav__title {
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
}

.left-pane {
  min-width: 250px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  // border-right: 1px solid $light-gray-10;
}

.sub-nav__link {
  font-size: 14px;
  color: $black;
}

.right-pane {
  flex: 1;
  border: solid whitesmoke 1px;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  

  .action-bar {
    width: 100%;
    position: sticky;
    bottom: 0;
    border-top: 1px solid lightgray;
    background-color: whitesmoke;

    .btn-save {
      margin-top: 10px;
      width: 150px;
    }
  }

  @include for-size(phone-only) {
    margin-top: 20px;
    padding: 5px;
  }
}

.right-pane__content {
  width: 60%;
  border: solid 1px whitesmoke;
  padding: 20px;
  margin-bottom: 10px;
  min-height: calc(100vh - 180px); 

  .content-header {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 100%;
    border-radius: 5px;

    .content-title {
      font-size: 12pt;
      font-weight: bold;
      height: 100%;
      width: 100%;
      padding-top: 5px;

    }

    .content-sub-title {
      font-size: 10pt;
      height: 100%;
      width: 100%;
    }
  }

  @include for-size(phone-only) {
    width: 100%;
    padding: 10px;
  }
}

.change-password-label {
  font-weight: bold;
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

</style>