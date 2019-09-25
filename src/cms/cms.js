import CMS from "netlify-cms-app";
import uploadcare from "netlify-cms-media-library-uploadcare";
import cloudinary from "netlify-cms-media-library-cloudinary";

import AboutPagePreview from "./preview-templates/AboutPagePreview";
import BetaSitePostPreview from "./preview-templates/BetaSitePostPreview";
import TestSitePostPreview from "./preview-templates/TestSitePostPreview";

import IndexPagePreview from "./preview-templates/IndexPagePreview";

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("about", AboutPagePreview);
CMS.registerPreviewTemplate("betasite", BetaSitePostPreview);
CMS.registerPreviewTemplate("testsite", TestSitePostPreview);
