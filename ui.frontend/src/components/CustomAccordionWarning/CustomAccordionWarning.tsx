import { FunctionComponent, useEffect, useRef } from 'react';
import { CustomAccordionWarningProps } from './type';
import DOMPurify from 'dompurify';
import 'tailwindcss/tailwind.css';

const isInAuthor = () => {
    const isIframe = window.self !== window.top;
    const wcmmode = document.querySelector('meta[property="cq:wcmmode"]')?.getAttribute('content');

    return isIframe && wcmmode ? true : false;
}

const CustomAccordionWarning: FunctionComponent<CustomAccordionWarningProps> = (props) => {
    const warningRef = useRef<HTMLDivElement | null>(null);
    const warningContentRef = useRef<HTMLDivElement | null>(null);
    const moreTextRef = useRef<HTMLDivElement | null>(null);
    const moreIconRef = useRef<HTMLDivElement | null>(null);

    function warningCollapse(event: React.MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        const warningDiv = warningRef.current;

        if (!warningDiv) return;

        warningDiv.classList.toggle('is-open');

        const moreIcon = moreIconRef.current;
        const moreText = moreTextRef.current;

        if (!moreIcon || !moreText) {
            return;
        }

        if (moreIcon.classList.contains('icon-line-plus')) {
            moreText.textContent = '收起全文';
            moreIcon.classList.remove('icon-line-plus');
            moreIcon.classList.add('icon-line-minus');
        } else {
            moreText.textContent = '展開全文';
            moreIcon.classList.remove('icon-line-minus');
            moreIcon.classList.add('icon-line-plus');
        }
    }

    useEffect(() => {
        const warningDiv = warningRef.current;
        const warningContentDiv = warningContentRef.current;
        const COLLAPSE_HEIGHT = 80;

        if (!warningContentDiv || !warningDiv) {
            return;
        }

        // 在編輯模式下編輯後且內容高度 > 80 時，將展開收合按鈕設為預設
        if (isInAuthor()) {
            warningDiv.classList.remove('is-open');
            warningDiv.classList.remove('is-active');

            const moreIcon = moreIconRef.current;
            const moreText = moreTextRef.current;

            if (!moreIcon || !moreText) {
                return;
            }

            if (warningContentDiv.clientHeight > COLLAPSE_HEIGHT) {
                warningDiv.classList.add('is-active');

                if (moreIcon.classList.contains('icon-line-minus')) {
                    moreText.textContent = '展開全文';
                    moreIcon.classList.remove('icon-line-minus');
                    moreIcon.classList.add('icon-line-plus');
                }
            }
        } else {
            if (warningContentDiv.clientHeight > COLLAPSE_HEIGHT) {
                warningDiv.classList.add('is-active');
            }
        }
    }, [props]);

    return (
        <section>
            <div className="mt-25">
                {props?.headline && props?.content && (
                    <div
                        ref={warningRef}
                        className="group relative bg-white px-5 pb-10 pt-11 before:absolute before:left-0 before:top-0 before:block before:h-1 before:w-full before:bg-gradient-to-r before:from-lime-600 before:to-green-500 before:content-['']"
                        data-accordion-warning="data-accordion-warning"
                    >
                        <div className="mx-auto desktop:w-[960px]">
                            <div className="text-center text-lg font-normal leading-[160%] tracking-[.4rem] text-gray-900">
                                {props.headline}
                            </div>
                            {props?.subheadline && (
                                <div className="mt-1.5 text-center text-sm font-normal tracking-[.2rem] text-gray-900">
                                    {props.subheadline}
                                </div>
                            )}
                            <div
                                ref={warningContentRef}
                                className="relative mt-4 overflow-hidden font-normal text-gray-700 group-[.is-active.is-open]:h-auto group-[.is-active]:h-20 group-[.is-active]:after:absolute group-[.is-active]:after:top-[-16px] group-[.is-active]:after:block group-[.is-active.is-open]:after:hidden group-[.is-active]:after:h-24 group-[.is-active]:after:w-full group-[.is-active]:after:bg-gradient-to-b group-[.is-active]:after:from-[#FFFFFF00] group-[.is-active]:after:to-gray-0 group-[.is-active]:after:content-['']"
                                data-accordion-warning-par="data-accordion-warning-par"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(props.content),
                                }}
                            ></div>
                            <div className="mt-5 hidden justify-center group-[.is-active]:flex">
                                <a
                                    className="flex flex cursor-pointer cursor-pointer items-center items-center gap-1 gap-1 text-green-600 no-underline no-underline hover:text-green-1000"
                                    href="/#"
                                    target=""
                                    data-accordion-warning-more="data-accordion-warning-more"
                                    onClick={(event) => warningCollapse(event)}
                                >
                                    <span
                                        ref={moreTextRef}
                                        className="text-base"
                                        data-accordion-warning-more-txt="data-accordion-warning-more-txt"
                                    >
                                        展開全文
                                    </span>
                                    <span
                                        ref={moreIconRef}
                                        className="iconfont iconfont-p icon-line-plus text-xl font-normal"
                                        data-accordion-warning-more-icon="data-accordion-warning-more-icon"
                                    ></span>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export const CustomAccordionWarningEditConfig = {
    emptyLabel: 'Custom Accordion Warning',
    isEmpty: function (props: CustomAccordionWarningProps) {
        return !props || !props.headline || !props.content;
    },
};

export default CustomAccordionWarning;
