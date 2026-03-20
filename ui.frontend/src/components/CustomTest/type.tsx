import { MappedComponentProperties } from "@adobe/aem-react-editable-components";

export interface CustomTestProps extends MappedComponentProperties {
    headline: string;
    subheadline: string;
    content: string;
}
