package com.adobe.aem.core.models;

import com.adobe.cq.export.json.ComponentExporter;

public interface CustomAccordionWarningModel extends ComponentExporter{

    public String getHeadline();

    public String getSubheadline();

    public String getContent();
}
