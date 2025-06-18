import { Model } from './Model';
import { Gallery, GalleryObject } from './Gallery';
import { DocumentURL } from '@/model/DocumentURL';
import { ContentURL } from './ContentURL';
import { Repo } from './Repo';
import { ProjectDataObject } from './Project';

export type ProjectProblemObject = {
  id: string | null;
  gallery: GalleryObject | null;
  content_url: string | null;
  whitepaper_url: string | null;
  project_id: string | null;
  client_id: string | null;
  summary: string | null;
  summary_url: string | null;
  customers_impacted: string | null;
  problem_affected: string | null;
  challenges: string | null;
  affected_operations: string | null;
  change_event: string | null;
  factors_contributed: string | null;
  patterns_trends: string | null;
  first_notice_date: string | null;
  recurring_issue: string | null;
  tried_solutions: string | null;
  tried_solutions_results: string | null;
  ideal_resolution: string | null;
};

export type ProjectProblemDataObject = {
  gallery: GalleryObject | null;
  content_url: string | null;
  whitepaper_url: string | null;
};

export class ProjectProblem extends Model {
  id: string | null;
  gallery: Gallery | null;
  contentURL: ContentURL | null;
  whitepaperURL: DocumentURL | null;
  projectID: string | null;
  clientID: string | null;
  summary: string | null;
  summaryURL: string | null;
  customersImpacted: string | null;
  problemAffected: string | null;
  challenges: string | null;
  affectedOperations: string | null;
  changeEvent: string | null;
  factorsContributed: string | null;
  patternsTrends: string | null;
  firstNoticeDate: string | null;
  recurringIssue: string | null;
  triedSolutions: string | null;
  triedSolutionsResults: string | null;
  idealResolution: string | null;

  constructor(data?: ProjectProblemObject) {
    super();

    this.id = data?.id ? data.id : null;
    this.gallery = data?.gallery ? new Gallery(data.gallery) : null;
    this.contentURL = data?.content_url
      ? new ContentURL(data.content_url)
      : null;
    this.whitepaperURL = data?.whitepaper_url
      ? new DocumentURL(data.whitepaper_url)
      : null;
    this.projectID = data?.project_id ? data.project_id : null;
    this.clientID = data?.client_id ? data.client_id : null;
    this.summary = data?.summary ? data.summary : null;
    this.summaryURL = data?.summary_url ? data.summary_url : null;
    this.customersImpacted = data?.customers_impacted
      ? data.customers_impacted
      : null;
    this.problemAffected = data?.problem_affected
      ? data.problem_affected
      : null;
    this.challenges = data?.challenges ? data.challenges : null;
    this.affectedOperations = data?.affected_operations
      ? data.affected_operations
      : null;
    this.changeEvent = data?.change_event ? data.change_event : null;
    this.factorsContributed = data?.factors_contributed
      ? data.factors_contributed
      : null;
    this.patternsTrends = data?.patterns_trends ? data.patterns_trends : null;
    this.firstNoticeDate = data?.first_notice_date
      ? data.first_notice_date
      : null;
    this.recurringIssue = data?.recurring_issue ? data.recurring_issue : null;
    this.triedSolutions = data?.tried_solutions ? data.tried_solutions : null;
    this.triedSolutionsResults = data?.tried_solutions_results
      ? data.tried_solutions_results
      : null;
    this.idealResolution = data?.ideal_resolution
      ? data.ideal_resolution
      : null;
  }

  setGallery(gallery: Gallery) {
    this.gallery = gallery;
  }

  setContentURL(url: string) {
    this.contentURL = new ContentURL(url);
  }

  setWhitepaperURL(url: string) {
    this.whitepaperURL = new DocumentURL(url);
  }

  fromRepo(repo: Repo) {
    if (
      repo.contents &&
      repo.contents.problem &&
      repo.contents.problem.downloadURL
    ) {
      this.setContentURL(repo.contents.problem.downloadURL);
    }
  }

  fromDocumentData(data: ProjectDataObject) {
    if (data?.problem) {
      if (data.problem?.gallery) {
        const gallery = new Gallery(data?.problem.gallery);
        this.setGallery(gallery);
      }

      if (data.problem.whitepaper_url) {
        this.setWhitepaperURL(data.problem.whitepaper_url);
      }
    }
  }

  toProjectProblemObject(): ProjectProblemObject {
    return {
      id: this.id,
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      content_url: this.contentURL ? this.contentURL.url : null,
      whitepaper_url: this.whitepaperURL ? this.whitepaperURL.url : null,
      project_id: this.projectID,
      client_id: this.clientID,
      summary: this.summary,
      summary_url: this.summaryURL,
      customers_impacted: this.customersImpacted,
      problem_affected: this.problemAffected,
      challenges: this.challenges,
      affected_operations: this.affectedOperations,
      change_event: this.changeEvent,
      factors_contributed: this.factorsContributed,
      patterns_trends: this.patternsTrends,
      first_notice_date: this.firstNoticeDate,
      recurring_issue: this.recurringIssue,
      tried_solutions: this.triedSolutions,
      tried_solutions_results: this.triedSolutionsResults,
      ideal_resolution: this.idealResolution,
    };
  }

  toProjectProblemDataObject(): ProjectProblemDataObject {
    return {
      gallery: this.gallery ? this.gallery.toGalleryObject() : null,
      content_url: this.contentURL ? this.contentURL.url : null,
      whitepaper_url: this.whitepaperURL?.url ? this.whitepaperURL.url : null,
    };
  }
}
