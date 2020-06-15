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
      <br />
      <GroupStageIndicator
        :stages="groupStages"
        :activeId="selectedId"
        @selectedIdChange="onSelectIdChange"
      />
      <br />
    </div>
    <div class="right-pane">
      <div class="approval-container">
        <ApprovalIndicator
          :stages="approvalStages"
          :currentStage="selectedApprovalStage"
          @stageSelect="onApprovalStageSelect"
        />
      </div>
      <div class="approval-actions">
        <p>This is for demo purpose only</p>
        <button @click="selectedApprovalStage = 0">Stage 1</button>
        <button @click="selectedApprovalStage = 1">Stage 2</button>
        <button @click="selectedApprovalStage = 2">Stage 3</button>
        <button @click="selectedApprovalStage = 3">Stage 4</button>
        <button @click="selectedApprovalStage = approvalStages.length">Mark all Complete</button>
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
import ApprovalIndicator from '../components/ApprovalIndicator'
import PhotoViewer from '../components/PhotoViewer'
import { SchoolCategories } from '../../helpers/enum'

export default {
  name: 'Demo',
  components: {
    StageIndicator,
    ApprovalIndicator,
    GroupStageIndicator,
    PhotoViewer
  },
  data() {
    return {
      SchoolCategories: SchoolCategories,
      selectedIndex: 0,
      selectedId: 1,
      selectedApprovalStage: 1,
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
      ]
    }
  },
  methods: {
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
    onPhotoRemove() {
      console.log('remove')
    }
  }
}
</script>
<style lang="scss" scoped>
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
  }
</style>