// 'use client'
// import React from 'react';
// import DOMPurify from 'dompurify';
// import { sanitize } from 'dompurify';


// interface TagHandlerProps {
//   children: React.ReactNode;
//   [key: string]: any;
// }

// type TagHandler = {
//   component: React.ComponentType<TagHandlerProps>;
//   props?: Record<string, any> | ((element: Element) => Record<string, any>);
// };

// interface HTMLRendererProps {
//   html: string;
//   tagHandlers?: Record<string, TagHandler>;
//   wrapper?: React.ElementType;
//   wrapperProps?: React.HTMLAttributes<HTMLElement>;
//   sanitizeOptions?: DOMPurify.Config;
//   fallbackComponent?: React.ComponentType<{ html: string }>;
// }

// const DefaultFallback: React.FC<{ html: string }> = ({ html }) => (
//   <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
// );

// const HTMLRenderer: React.FC<HTMLRendererProps> = ({
//   html,
//   tagHandlers = {},
//   wrapper: Wrapper = 'div',
//   wrapperProps = {},
//   sanitizeOptions = {},
//   fallbackComponent: Fallback = DefaultFallback,
// }) => {
//   const parseHTML = React.useCallback((htmlString: string): DocumentFragment => {
//     const allowedTags = Array.from(
//       new Set([
//         ...Object.keys(tagHandlers),
//         ...(sanitizeOptions.ADD_TAGS || []),
//         'b', 'i', 'u', 'em', 'strong', 'p', 'span', 'div', 'br'
//       ])
//     );

//     return DOMPurify.sanitize(htmlString, {
//       ...sanitizeOptions,
//       ADD_TAGS: allowedTags,
//       RETURN_DOM_FRAGMENT: true,
//     }) as unknown as DocumentFragment;
//   }, [tagHandlers, sanitizeOptions]);

//   const renderNode = React.useCallback((node: Node, key: number): React.ReactNode => {
//     if (node.nodeType === Node.TEXT_NODE) {
//       return node.textContent;
//     }

//     if (node.nodeType !== Node.ELEMENT_NODE) {
//       return null;
//     }

//     const element = node as Element;
//     const tagName = element.tagName.toLowerCase();

//     // Handle custom tags
//     if (tagHandlers[tagName]) {
//       const { component: CustomComponent, props } = tagHandlers[tagName];
//       const resolvedProps = typeof props === 'function' 
//         ? props(element) 
//         : props || {};

//       return (
//         <CustomComponent 
//           key={key}
//           {...resolvedProps}
//           dangerouslySetInnerHTML={undefined}
//         >
//           {Array.from(element.childNodes).map((child, i) => renderNode(child, i))}
//         </CustomComponent>
//       );
//     }

//     // Handle standard HTML elements
//     const props: React.HTMLAttributes<HTMLElement> = { key };
//     Array.from(element.attributes).forEach((attr) => {
//       props[attr.name as keyof React.HTMLAttributes<HTMLElement>] = attr.value;
//     });

//     return React.createElement(
//       tagName,
//       props,
//       ...Array.from(element.childNodes).map((child, i) => renderNode(child, i))
//     );
//   }, [tagHandlers]);

//   try {
//     const dom = parseHTML(html);
//     return (
//       <Wrapper {...wrapperProps} dangerouslySetInnerHTML={undefined}>
//         {Array.from(dom.childNodes).map((node, i) => renderNode(node, i))}
//       </Wrapper>
//     );
//   } catch (error) {
//     console.error('HTMLRenderer error:', error);
//     return <Fallback html={html} />;
//   }
// };

// export default HTMLRenderer;