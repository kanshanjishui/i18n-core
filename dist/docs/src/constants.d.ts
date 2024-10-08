import { Image, Link, ArrayObject } from './readme/types';
export declare const langs: {
    code: string;
    locale: string;
    name: string;
}[];
declare const links: readonly [{
    readonly title: "npm";
    readonly href: "https://www.npmjs.com/package/i18n-pro";
}, {
    readonly title: "github";
    readonly href: "https://github.com/i18n-pro/core";
}, {
    readonly title: "bundlesize";
    readonly href: "https://bundlephobia.com/package/i18n-pro";
}, {
    readonly title: "github-stars";
    readonly href: "https://github.com/i18n-pro/core/stargazers";
}, {
    readonly title: "last-commit";
    readonly href: "https://github.com/i18n-pro/core/commits/dev";
}, {
    readonly title: "github-issues";
    readonly href: "https://github.com/i18n-pro/core/issues";
}, {
    readonly title: "codecov";
    readonly href: "https://codecov.io/gh/i18n-pro/core";
}];
type LinkTitleType = ArrayObject<typeof links, 'title'>;
type LinkObject = Record<LinkTitleType, Link>;
export declare const linkObj: LinkObject;
declare const images: readonly [{
    readonly title: "demo";
    readonly alt: "demo";
    readonly src: "https://s3.bmp.ovh/imgs/2023/05/02/cc60f507a8f76a81.gif";
}, {
    readonly title: "logo";
    readonly alt: "logo";
    readonly src: "https://s3.bmp.ovh/imgs/2022/06/25/3a1c742f283cf28e.png";
}, {
    readonly title: "npm-version";
    readonly alt: "npm-version";
    readonly src: "https://img.shields.io/npm/v/i18n-pro.svg?style=flat-square";
}, {
    readonly title: "npm-download";
    readonly alt: "npm-download";
    readonly src: "https://img.shields.io/npm/dm/i18n-pro";
}, {
    readonly title: "bundlesize";
    readonly alt: "bundlesize";
    readonly src: "https://img.shields.io/bundlephobia/minzip/i18n-pro?color=brightgreen&style=plastic";
}, {
    readonly title: "github-stars";
    readonly alt: "github-stars";
    readonly src: "https://img.shields.io/github/stars/i18n-pro/core?style=social";
}, {
    readonly title: "last-commit";
    readonly alt: "last-commit";
    readonly src: "https://img.shields.io/github/last-commit/i18n-pro/core/dev";
}, {
    readonly title: "github-issues";
    readonly alt: "github-issues";
    readonly src: "https://img.shields.io/github/issues-raw/i18n-pro/core";
}, {
    readonly title: "baidu-api-type";
    readonly alt: "baidu-api-type";
    readonly src: "https://fanyiapp.cdn.bcebos.com/api/doc/%E7%99%BE%E5%BA%A6%E7%BF%BB%E8%AF%91%E5%BC%80%E6%94%BE%E5%B9%B3%E5%8F%B0%E9%80%9A%E7%94%A8%E7%BF%BB%E8%AF%91API%E6%9C%8D%E5%8A%A1%E5%8D%87%E7%BA%A7%E8%AF%B4%E6%98%8E.pdf";
}, {
    readonly title: "codecov";
    readonly alt: "codecov";
    readonly src: "https://codecov.io/gh/i18n-pro/core/branch/main/graph/badge.svg?token=758C46SIE7";
}];
type ImageTitleType = ArrayObject<typeof images, 'title'>;
type ImageObject = Record<ImageTitleType, Image>;
export declare const imageObj: ImageObject;
export {};
