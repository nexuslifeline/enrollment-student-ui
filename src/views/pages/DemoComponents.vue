<template>
  <div class="wrapper">
    <div class="left-pane">
      <StageIndicator
        :stages="stages"
        :activeIndex="selectedIndex"
        @selectedItem="onSelectStage"
      />
      <br />
      <div class="profile-photo">
        <PhotoViewer
          @onPhotoChange="onPhotoChange"
          @onPhotoRemove="onPhotoRemove"
        />
      </div>
      <hr />
      <h4>PROFILE MAKER SAMPLE</h4>
      <div class="profile-photo-maker">
        <ProfileMaker initials="PC" :colorIndex="0" :fontSize="85" />
      </div>
      <div class="profile-photo-maker-slight-radius">
        <ProfileMaker initials="PR" :colorIndex="2" :fontSize="60" />
      </div>
      <div class="profile-photo-maker-circle">
        <ProfileMaker initials="GM" :colorIndex="1" :fontSize="35" />
      </div>
      <br />
      <hr />
      <GroupStageIndicator
        :stages="groupStages"
        :activeId="selectedId"
        @selectedIdChange="onSelectIdChange"
      />
      
    </div>
    <div class="right-pane">
      <div class="approval-container">
        <ApprovalIndicator
          :stages="approvalStages"
          :currentStage="selectedApprovalStage"
          @stageSelect="onApprovalStageSelect"
        />
      </div>
      <div>
        <h3>Progress Indicator</h3>
        <ProgressIndicator />
      </div>
      <div class="approval-actions">
        <p>This is for demo purpose only</p>
        <button @click="selectedApprovalStage = 0">Stage 1</button>
        <button @click="selectedApprovalStage = 1">Stage 2</button>
        <button @click="selectedApprovalStage = 2">Stage 3</button>
        <button @click="selectedApprovalStage = 3">Stage 4</button>
        <button @click="selectedApprovalStage = approvalStages.length">Mark all Complete</button>
      </div>
      <div class="file-uploader-container">
        <FileUploader @onFileChange="onFileChange" @onFileDrop="onFileDrop" />
      </div>
      <br />
      <h1>Group Stage V2</h1>
      <hr />
      <GroupStageIndicatorV2
        :stages="groupStagesV2"
        :activeId="2"
        @selectedIdChange="onSelectIdChange"
      />
      <div class="file-item-container">
        <button @click="makeFirstFileBusy">Make First File Item Busy</button>
        <button @click="makeFirstFileNotBusy">Make First File Item Not Busy</button>
        <button @click="addNewFileItem">Add New File Item</button>
        <FileItem
          v-for="(item, index) of fileItems"
          :key="index"
          :title="item.title"
          :description="item.description"
          :fileIndex="index"
          @onFileItemSelect="onFileItemSelect"
          @onFileItemRemove="onFileItemRemove"
          @onFileItemPreview="onFileItemRemove"
          :isBusy="item.isBusy"
        />
      </div>
      <div>
        <h3>Enum Helper</h3>
        <h4 class="mt-4">Accessing values</h4>
        <p class="code-section"><code>SchoolCategories.values</code></p>
        <p>console.log output:</p>
        <p class="code-section"><code>{{SchoolCategories.values}}</code></p>
        <h4 class="mt-4">Getting object from a id</h4>
        <p class="code-section"><code>SchoolCategories.getEnum(1)</code></p>
        <p>console.log output:</p>
        <p class="code-section"><code>{{SchoolCategories.getEnum(1)}}</code></p>
        <h4 class="mt-4">Getting name value from a id</h4>
        <p class="code-section"><code>SchoolCategories.getEnum(1).name</code></p>
        <p>console.log output:</p>
        <p class="code-section"><code>{{SchoolCategories.getEnum(1).name}}</code></p>
        <h4 class="mt-4">Accessing id</h4>
        <p class="code-section"><code>SchoolCategories.PRE_SCHOOL.id</code></p>
        <p>console.log output:</p>
        <p class="code-section"><code>{{SchoolCategories.PRE_SCHOOL.id}}</code></p>
        <h4 class="mt-4">Accessing name</h4>
        <p class="code-section"><code>SchoolCategories.PRE_SCHOOL.name</code></p>
        <p>console.log output:</p>
        <p class="code-section"><code>{{SchoolCategories.PRE_SCHOOL.name}}</code></p>
        <h4 class="mt-4">Getting object from a value</h4>
        <p class="code-section"><code>SchoolCategories.getEnumByValue('Pre-School')</code></p>
        <p>console.log output:</p>
        <p class="code-section"><code>{{SchoolCategories.getEnumByValue('Pre-School')}}</code></p>
      </div>
    </div>
  </div>
</template>

<script>
import StageIndicator from '../components/StageIndicator'
import GroupStageIndicator from '../components/GroupStageIndicator'
import GroupStageIndicatorV2 from '../components/SlideStageIndicator'
import ApprovalIndicator from '../components/ApprovalIndicator'
import PhotoViewer from '../components/PhotoViewer'
import FileUploader from '../components/FileUploader'
import FileItem from '../components/FileItem'
import ProfileMaker from '../components/ProfileMaker'
import ProgressIndicator from '../components/ProgressIndicator'
import { SchoolCategories } from '../../helpers/enum'

export default {
  name: 'Demo',
  components: {
    StageIndicator,
    ApprovalIndicator,
    GroupStageIndicator,
    GroupStageIndicatorV2,
    PhotoViewer,
    FileUploader,
    FileItem,
    ProfileMaker,
    ProgressIndicator
  },
  data() {
    return {
      SchoolCategories: SchoolCategories,
      selectedIndex: 0,
      selectedId: 1,
      selectedApprovalStage: 1,
      fileItems: [
        { title: 'FILE-01232-XERIJKJ.jpg', isBusy: false, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing' },
        { title: 'FILE-21232-XERIJKJ.jpg', isBusy: false, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing' }
      ],
      stages: [
        {
          header: 'Personal Information',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit psum dolor sit amet psum dolor sit amet'
        },
        {
          header: 'Complete Address',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        },
        {
          header: 'Family Background',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        },
        {
          header: 'Educational Background',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        },
        {
          header: 'Admission',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        },
        {
          header: 'Current Academic Year',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        },
        {
          header: 'Requirements',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        }
      ],
      approvalStages: [
        { approvedLabel: 'Data Completed', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Approved by Registrar', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Approved by Staff', waitingLabel: 'Waiting for Approval' },
        { approvedLabel: 'Done', waitingLabel: 'Waiting for Completion' }
      ],
      groupStages: [
        {
          header: 'PROFILE INFORMATION',
          children: [
            { id: 1, subHeader: 'Profile' },
            { id: 2, subHeader: 'Family Background' },
            { id: 3, subHeader: 'Previous Education' }
          ]
        },
        {
          header: 'ADMISSION',
          children: [
            { id: 4, subHeader: 'Academic Year' },
            { id: 5, subHeader: 'Requirements' }
          ]
        },
        {
          header: 'Payment',
          children: [
            { id: 6, subHeader: 'Academic Year' },
            { id: 7, subHeader: 'Requirements' }
          ]
        },
      ],
      groupStagesV2: [
        {
          header: 'Proflie Information',
          children: [
            { id: 1, subHeader: 'Profile' },
            { id: 2, subHeader: 'Family Background' },
            { id: 3, subHeader: 'Previous Education' }
          ]
        },
        {
          header: 'Admission',
          children: [
            { id: 4, subHeader: 'Academic Year' },
            { id: 5, subHeader: 'Requirements' }
          ]
        },
        {
          header: 'Payment',
          children: [
            { id: 6, subHeader: 'Academic Year' },
            { id: 7, subHeader: 'Requirements' }
          ]
        },
      ]
    }
  },
  methods: {
    makeFirstFileBusy() {
      this.fileItems[0].isBusy = true;
    },
    makeFirstFileNotBusy() {
      this.fileItems[0].isBusy = false;
    },
    addNewFileItem() {
      const time = new Date().getTime(); // generated a sample filename only
      this.fileItems.push({ title: `FILE-${time}.jpg`, isBusy: true, description: 'This is a new item' });
      setTimeout(() => this.fileItems[this.fileItems.length - 1].isBusy = false, 1000);
    },
    onFileItemSelect(idx) {
      console.log(idx)
    },
    onFileItemRemove(idx) {
      console.log(idx)
      this.fileItems[idx].isBusy = true;
      setTimeout(() => this.fileItems.splice(idx, 1), 1000);
    },
    onFileItemPreview(idx) {
      console.log(idx)
    },
    onSelectStage(idx) {
      this.selectedIndex = idx;
    },
    onApprovalStageSelect(idx) {
      this.selectedApprovalStage = idx;
    },
    onSelectIdChange(id) {
      console.log(id)
      this.selectedId = id;
    },
    onPhotoChange(file) {
      const formData = new FormData();
      formData.append('photo', file);
      console.log(formData)
    },
    onFileChange(file) {
      const formData = new FormData();
      formData.append('file', file);
      console.log('file change', formData)
    },
    onFileDrop(file) {
      const formData = new FormData();
      formData.append('file', file);
      console.log('file drop', formData)
    },
    onPhotoRemove() {
      console.log('remove')
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/scss/shared.scss";

  .file-uploader-container {
    width: 500px;
    height: 200px;
    margin-bottom: 40px;
  }

  .code-section {
    background-color: black;
    padding: 3px 10px;
  }

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .left-pane {
    flex-basis: 350px;
    padding: 20px;
  }

  .right-pane {
    flex: 1;
    padding: 20px;
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
    margin: 10px;
  }

  .profile-photo-maker {
    height: 200px;
    width: 200px;
    border: 1px solid $dark-gray-200;
    margin: 10px;
  }

  .profile-photo-maker-slight-radius {
    height: 150px;
    width: 150px;
    border: 1px solid $dark-gray-200;
    margin: 10px;
    border-radius: 5px;
    overflow: hidden;
  }

  .profile-photo-maker-circle {
    height: 100px;
    width: 100px;
    border: 1px solid $dark-blue;
    margin: 10px;
    border-radius: 50%;
    overflow: hidden;
  }

  .file-item-container {
    min-height: 200px;
    width: 500px;
    height: auto;
  }
</style>