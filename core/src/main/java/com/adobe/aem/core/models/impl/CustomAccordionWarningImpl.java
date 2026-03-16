package com.adobe.aem.core.models.impl;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.aem.core.models.CustomAccordionWarningModel;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;

@Model(adaptables = SlingHttpServletRequest.class, adapters = { CustomAccordionWarningModel.class,
		ComponentExporter.class }, resourceType = CustomAccordionWarningImpl.RESOURCE_TYPE, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class CustomAccordionWarningImpl implements CustomAccordionWarningModel {

	private static final Logger LOGGER = LoggerFactory.getLogger(CustomAccordionWarningImpl.class);

	static final String RESOURCE_TYPE = "testPRAgent/components/custom-content/custom-accordionwarning/v1/cub-accordionwarning";

	@SlingObject
	private ResourceResolver resourceResolver;

	@ValueMapValue
	private String headline;

	@ValueMapValue
	private String subheadline;

	@ValueMapValue
	private String content;

	@Override
	public String getHeadline() {
		return headline;
	}

	@Override
	public String getSubheadline() {
		return subheadline;
	}

	@Override
	public String getContent() {
		return content;
	}

	@Override
	public String getExportedType() {
		return CustomAccordionWarningImpl.RESOURCE_TYPE;
	}

}
