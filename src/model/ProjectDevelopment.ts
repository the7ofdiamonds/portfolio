import { Model } from './Model';
import { Task, TaskObject } from './Task';
import { ProjectVersions, ProjectVersionsObject } from './ProjectVersions';
import { ProjectSkills, ProjectSkillsDataObject } from './ProjectSkills';
import { ProjectSkillsObject } from './ProjectSkills';
import { Gallery, GalleryObject } from './Gallery';
import { CheckList, CheckListObject } from './CheckList';
import { ContentURL } from './ContentURL';
import { RepoURL } from './RepoURL';
import { FeaturesRoadmap } from './FeaturesRoadmap';
import { Repo } from './Repo';
import { ProjectDataObject } from './Project';

export type ProjectDevelopmentObject = {
  gallery: GalleryObject | null;
  repo_url: string | null;
  content_url: string | null;
  skills: ProjectSkillsObject | null;
  check_list: CheckListObject | null;
  versions_list: ProjectVersionsObject | null;
};

export type ProjectDevelopmentDataObject = {
  gallery: GalleryObject | null;
  repo_url: string | null;
  content_url: string | null;
  skills: ProjectSkillsDataObject | null;
  check_list: CheckListObject | null;
  versions_list: ProjectVersionsObject | null;
};

export class ProjectDevelopment extends Model {
  gallery: Gallery | null;
  repoURL: RepoURL | null;
  contentURL: ContentURL | null;
  skills: ProjectSkills | null;
  checkList: CheckList | null;
  versionsList: ProjectVersions | null;
  roadmap: FeaturesRoadmap | null;

  constructor(data: Record<string, any> | ProjectDevelopmentObject = {}) {
    super();

    this.gallery = data?.gallery ? new Gallery(data.gallery) : null;
    this.repoURL = data?.repo_url ? new RepoURL(data.repo_url) : null;
    this.contentURL = data?.content_url
      ? new ContentURL(data.content_url)
      : null;
    this.skills = data?.skills ? new ProjectSkills(data.skills) : null;
    this.checkList = data?.check_list ? new CheckList(data.check_list) : null;
    this.versionsList = data?.versions_list
      ? new ProjectVersions(data.versions_list)
      : null;
    this.roadmap = new FeaturesRoadmap();
  }

  setGallery(gallery: Gallery) {
    this.gallery = gallery;
  }

  toArrayTask(data: Array<TaskObject>) {
    const checkList: Array<Task> = [];

    data.forEach((task) => {
      checkList.push(new Task(task));
    });

    return checkList;
  }

  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
  }

  setSkills(skills: ProjectSkills) {
    this.skills = skills;
  }

  setCheckList(tasks: Array<Task>) {
    if (tasks && Array.isArray(tasks) && tasks.length > 0) {
      const checkList = new CheckList();
      checkList.setTasks(new Set(tasks));
      this.checkList = checkList;
    }
  }

  setRepoURL(url: string) {
    this.repoURL = new RepoURL(url);
  }

  setVersionsList(versionsList: ProjectVersions) {
    this.versionsList = versionsList;
  }

  setRoadmap(roadmap: FeaturesRoadmap) {
    this.roadmap = roadmap;
  }

  fromRepo(repo: Repo) {
    if (repo.contents?.development?.downloadURL) {
      this.contentURL = new ContentURL(repo.contents.development.downloadURL);
    }

    if (repo.skills) {
      this.skills = new ProjectSkills();
      this.skills.add(repo.skills);
    }

    if (repo.repoURL) {
      this.repoURL = new RepoURL(repo.repoURL);
    }

    if (repo.issues?.development) {
      const tasks = repo.issues?.toTask(repo.issues?.development);
      this.setCheckList(tasks);
    }
  }

  fromDocumentData(data: ProjectDataObject) {
    if (data?.process?.development) {
      if (data.process.development?.skills) {
        this.skills ? this.skills : (this.skills = new ProjectSkills());
        this.skills.fromDocumentData(data?.process?.development?.skills);
      }

      if (
        data.process.development.gallery &&
        ((data.process.development.gallery.animations &&
          data.process.development.gallery.animations?.length > 0) ||
          (data.process.development.gallery.icons &&
            data.process.development.gallery.icons.length > 0) ||
          (data.process.development.gallery.logos &&
            data.process.development.gallery.logos.length > 0) ||
          (data.process.development.gallery.previews &&
            data.process.development.gallery.previews.length > 0) ||
          (data.process.development.gallery.screenshots &&
            data.process.development.gallery.screenshots.length > 0) ||
          (data.process.development.gallery.uml_diagrams &&
            data.process.development.gallery.uml_diagrams.length > 0))
      ) {
        const gallery = new Gallery(data?.process.development.gallery);
        this.setGallery(gallery);
      }
    }
  }

  toProjectDevelopmentObject(): ProjectDevelopmentObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      repo_url: this.repoURL ? this.repoURL.url : null,
      content_url: this.contentURL ? this.contentURL.url : null,
      skills: this.skills ? this.skills.toProjectSkillsObject() : null,
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      versions_list: this.versionsList
        ? this.versionsList.toProjectVersionsObject()
        : null,
    };
  }

  toProjectDevelopmentDataObject(): ProjectDevelopmentDataObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      repo_url: this.repoURL ? this.repoURL.url : null,
      content_url: this.contentURL ? this.contentURL.url : null,
      skills: this.skills ? this.skills.toProjectSkillsDataObject() : null,
      check_list: this.checkList ? this.checkList.toCheckListObject() : null,
      versions_list: this.versionsList
        ? this.versionsList.toProjectVersionsObject()
        : null,
    };
  }
}
