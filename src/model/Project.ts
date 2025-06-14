import { Model } from './Model';
import {
  ProjectSolution,
  ProjectSolutionDataObject,
  ProjectSolutionObject,
} from './ProjectSolution';
import {
  ProjectProcess,
  ProjectProcessDataObject,
  ProjectProcessObject,
} from './ProjectProcess';
import {
  ProjectProblem,
  ProjectProblemDataObject,
  ProjectProblemObject,
} from './ProjectProblem';
import {
  ProjectDetails,
  ProjectDetailsDataObject,
  ProjectDetailsObject,
} from './ProjectDetails';
import { Repo } from './Repo';
import { Owner, OwnerObject } from './Owner';
import { ProjectQuery } from './ProjectQuery';

export type ProjectObject = {
  id: string | null;
  name: string | null;
  title: string | null;
  subtitle: string | null;
  promotional_text: string | null;
  description: string | null;
  solution: ProjectSolutionObject | null;
  process: ProjectProcessObject | null;
  problem: ProjectProblemObject | null;
  owner: OwnerObject | null;
  details: ProjectDetailsObject | null;
};

export type ProjectDataObject = {
  id: string | null;
  title: string | null;
  subtitle: string | null;
  promotional_text: string | null;
  solution: ProjectSolutionDataObject | null;
  process: ProjectProcessDataObject | null;
  problem: ProjectProblemDataObject | null;
  owner: OwnerObject | null;
  details: ProjectDetailsDataObject | null;
};

export class Project extends Model {
  id: string | null;
  name: string | null;
  title: string | null;
  subtitle: string | null;
  promotionalText: string | null;
  description: string | null;
  solution: ProjectSolution | null;
  process: ProjectProcess | null;
  problem: ProjectProblem | null;
  owner: Owner;
  details: ProjectDetails | null;
  query: ProjectQuery | null;

  constructor(data?: ProjectObject) {
    super();

    try {
      this.id = data?.id ? data.id : null;
      this.name = data?.name ? data.name : null;
      this.title = data?.title
        ? data.title
        : this.name
        ? this.getTitle(this.name)
        : null;
      this.subtitle = data?.subtitle ?? null;
      this.promotionalText = data?.promotional_text ?? null;
      this.description = data?.description ?? null;
      this.solution = data?.solution
        ? new ProjectSolution(data.solution)
        : null;
      this.process = data?.process ? new ProjectProcess(data.process) : null;
      this.owner = data?.owner ? new Owner(data.owner) : new Owner();
      this.details = data?.details ? new ProjectDetails(data.details) : null;
      this.problem = data?.problem ? new ProjectProblem(data?.problem) : null;
      this.query =
        this.owner.login && this.name
          ? new ProjectQuery(this.owner.login, this.name)
          : null;
    } catch (error) {
      let err = error as Error;
      throw new Error(err.message);
    }
  }

  setID(id: string) {
    this.id = id;
  }

  setName(name: string) {
    this.name = name;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setSubtitle(subtitle: string) {
    this.subtitle = subtitle;
  }

  setPromotionalText(promotionalText: string) {
    this.promotionalText = promotionalText;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setSolution(solution: ProjectSolution) {
    this.solution = solution;
  }

  setProcess(process: ProjectProcess) {
    this.process = process;
  }

  setProblem(problem: ProjectProblem) {
    this.problem = problem;
  }

  setOwner(owner: Owner) {
    this.owner = owner;
  }

  setDetails(details: ProjectDetails) {
    this.details = details;
  }

  setQuery(query: ProjectQuery) {
    this.query = query;
  }

  getTitle(id: string | null): string {
    return id
      ? id
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ')
      : 'Untitled Project';
  }

  fromRepo(repo: Repo) {
    this.id = repo.id;
    this.name = repo.name;
    this.title = this.title ? this.title : this.getTitle(this.name);
    this.description = repo.description;

    if (repo.owner) {
      this.setOwner(repo.owner);
    }

    if (repo.contents?.solution?.downloadURL || repo?.homepage) {
      const solution = new ProjectSolution();
      solution.fromRepo(repo);
      this.setSolution(solution);
    }

    if (
      repo.createdAt ||
      repo.updatedAt ||
      repo.contents ||
      repo.issues ||
      repo.skills ||
      repo.repoURL
    ) {
      const process = new ProjectProcess();
      process.fromRepo(repo);
      this.setProcess(process);
    }

    if (repo.contents && repo.contents.problem) {
      const problem = new ProjectProblem();
      problem.fromRepo(repo);
      this.setProblem(problem);
    }

    if (
      repo.contents?.details ||
      repo.contents?.story ||
      repo.size ||
      repo.contributors
    ) {
      const details = new ProjectDetails();
      details.fromRepo(repo);
      this.setDetails(details);
    }
  }

  fromDocumentData(data: ProjectDataObject) {
    this.title = data?.title ? data.title : this.getTitle(this.name);

    if (data?.solution) {
      this.solution ? this.solution : (this.solution = new ProjectSolution());
      this.solution.fromDocumentData(data);
    }

    if (data?.process) {
      this.process ? this.process : (this.process = new ProjectProcess());
      this.process.fromDocumentData(data);
    }

    if (data?.problem) {
      this.problem ? this.problem : (this.problem = new ProjectProblem());
      this.problem.fromDocumentData(data);
    }

    if (data?.details) {
      this.details ? this.details : (this.details = new ProjectDetails());
      this.details.fromDocumentData(data);
    }
  }

  toProjectObject(): ProjectObject {
    return {
      id: this.id,
      name: this.name,
      title: this.title,
      subtitle: this.subtitle,
      promotional_text: this.promotionalText,
      description: this.description,
      solution: this.solution ? this.solution.toProjectSolutionObject() : null,
      process: this.process ? this.process.toProjectProcessObject() : null,
      problem: this.problem ? this.problem.toProjectProblemObject() : null,
      details: this.details ? this.details.toDetailsObject() : null,
      owner: this.owner ? this.owner.toOwnerObject() : null,
    };
  }

  toProjectDataObject(): ProjectDataObject {
    return {
      id: this.id,
      title: this.title,
      subtitle: this.subtitle,
      promotional_text: this.promotionalText,
      solution: this.solution
        ? this.solution.toProjectSolutionDataObject()
        : null,
      process: this.process ? this.process.toProjectProcessDataObject() : null,
      problem: this.problem ? this.problem.toProjectProblemDataObject() : null,
      details: this.details ? this.details.toDetailsDataObject() : null,
      owner: this.owner ? this.owner.toOwnerObject() : null,
    };
  }
}
