import { tools } from "@/data/tools";
import { notFound } from "next/navigation";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { Metadata } from "next";

// Text Tools
import { WordCounter } from "@/components/tools/text/WordCounter";
import { CaseConverter } from "@/components/tools/text/CaseConverter";
import { CharacterCounter } from "@/components/tools/text/CharacterCounter";
import { RemoveExtraSpaces } from "@/components/tools/text/RemoveExtraSpaces";
import { SlugGenerator } from "@/components/tools/text/SlugGenerator";
import { TextSorter } from "@/components/tools/text/TextSorter";
import { DuplicateLineRemover } from "@/components/tools/text/DuplicateLineRemover";
import { TextReverser } from "@/components/tools/text/TextReverser";

// Developer Tools
import { JsonFormatter } from "@/components/tools/developer/JsonFormatter";
import { Base64Converter } from "@/components/tools/developer/Base64Converter";
import { UrlEncoder } from "@/components/tools/developer/UrlEncoder";
import { HtmlEscaper } from "@/components/tools/developer/HtmlEscaper";
import { TimestampConverter } from "@/components/tools/developer/TimestampConverter";
import { RegexTester } from "@/components/tools/developer/RegexTester";
import { ColorConverter } from "@/components/tools/developer/ColorConverter";
import { JwtDecoder } from "@/components/tools/developer/JwtDecoder";
import { HashGenerator } from "@/components/tools/developer/HashGenerator";

// Image Tools
import { JpgToPng } from "@/components/tools/image/JpgToPng";
import { PngToJpg } from "@/components/tools/image/PngToJpg";
import { WebpConverter } from "@/components/tools/image/WebpConverter";
import { ImageResizer } from "@/components/tools/image/ImageResizer";
import { ImageCompressor } from "@/components/tools/image/ImageCompressor";
import { ImageRotator } from "@/components/tools/image/ImageRotator";
import { ImageToBase64 } from "@/components/tools/image/ImageToBase64";
import { ColorPicker } from "@/components/tools/image/ColorPicker";
import { FaviconGenerator } from "@/components/tools/image/FaviconGenerator";

// SEO Tools
import { MetaTagGenerator } from "@/components/tools/seo/MetaTagGenerator";
import { RobotsTxtGenerator } from "@/components/tools/seo/RobotsTxtGenerator";
import { SitemapGenerator } from "@/components/tools/seo/SitemapGenerator";
import { KeywordDensityChecker } from "@/components/tools/seo/KeywordDensityChecker";
import { SchemaGenerator } from "@/components/tools/seo/SchemaGenerator";
import { SerpPreview } from "@/components/tools/seo/SerpPreview";

// Calculator Tools
import { AgeCalculator } from "@/components/tools/calculator/AgeCalculator";
import { PercentageCalculator } from "@/components/tools/calculator/PercentageCalculator";
import { BmiCalculator } from "@/components/tools/calculator/BmiCalculator";
import { LoanCalculator } from "@/components/tools/calculator/LoanCalculator";
import { DiscountCalculator } from "@/components/tools/calculator/DiscountCalculator";
import { TipCalculator } from "@/components/tools/calculator/TipCalculator";
import { DateCalculator } from "@/components/tools/calculator/DateCalculator";
import { TimeCalculator } from "@/components/tools/calculator/TimeCalculator";
import { UnitConverter } from "@/components/tools/calculator/UnitConverter";
import { GpaCalculator } from "@/components/tools/calculator/GpaCalculator";

// Student Tools
import { CitationGenerator } from "@/components/tools/student/CitationGenerator";
import { PomodoroTimer } from "@/components/tools/student/PomodoroTimer";
import { FinalGradeCalculator } from "@/components/tools/student/FinalGradeCalculator";
import { ExamCountdown } from "@/components/tools/student/ExamCountdown";
import { ReadingTimeEstimator } from "@/components/tools/student/ReadingTimeEstimator";
import { TextToSpeech } from "@/components/tools/student/TextToSpeech";

// Web Tools
import { QrCodeGenerator } from "@/components/tools/web/QrCodeGenerator";
import { MyIpFinder } from "@/components/tools/web/MyIpFinder";
import { UserAgentViewer } from "@/components/tools/web/UserAgentViewer";
import { ScreenResolution } from "@/components/tools/web/ScreenResolution";

// Security Tools
import { PasswordGenerator } from "@/components/tools/security/PasswordGenerator";
import { PasswordStrength } from "@/components/tools/security/PasswordStrength";
import { RsaGenerator } from "@/components/tools/security/RsaGenerator";
import { UuidGenerator } from "@/components/tools/security/UuidGenerator";

// Social Media Tools
import { YouTubeThumbnail } from "@/components/tools/social/YouTubeThumbnail";
import { TweetPreview } from "@/components/tools/social/TweetPreview";
import { HashtagGenerator } from "@/components/tools/social/HashtagGenerator";

// Map slugs to components
const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
    // Text
    "word-counter": WordCounter,
    "case-converter": CaseConverter,
    "character-counter": CharacterCounter,
    "remove-extra-spaces": RemoveExtraSpaces,
    "slug-generator": SlugGenerator,
    "text-sorter": TextSorter,
    "duplicate-line-remover": DuplicateLineRemover,
    "text-reverser": TextReverser,

    // Developer
    "json-formatter": JsonFormatter,
    "base64-encode-decode": Base64Converter,
    "url-encode-decode": UrlEncoder,
    "html-escape-unescape": HtmlEscaper,
    "timestamp-converter": TimestampConverter,
    "regex-tester": RegexTester,
    "color-converter": ColorConverter,
    "jwt-decoder": JwtDecoder,
    "hash-generator": HashGenerator,

    // Image
    "jpg-to-png": JpgToPng,
    "png-to-jpg": PngToJpg,
    "webp-converter": WebpConverter,
    "image-resizer": ImageResizer,
    "image-compressor": ImageCompressor,
    "image-rotator": ImageRotator,
    "image-to-base64": ImageToBase64,
    "color-picker": ColorPicker,
    "favicon-generator": FaviconGenerator,

    // SEO
    "meta-tag-generator": MetaTagGenerator,
    "robots-txt-generator": RobotsTxtGenerator,
    "sitemap-xml-generator": SitemapGenerator,
    "keyword-density-checker": KeywordDensityChecker,
    "schema-markup-generator": SchemaGenerator,
    "serp-preview": SerpPreview,

    // Calculator
    "age-calculator": AgeCalculator,
    "percentage-calculator": PercentageCalculator,
    "bmi-calculator": BmiCalculator,
    "loan-calculator": LoanCalculator,
    "discount-calculator": DiscountCalculator,
    "tip-calculator": TipCalculator,
    "date-calculator": DateCalculator,
    "time-calculator": TimeCalculator,
    "unit-converter": UnitConverter,
    "gpa-calculator": GpaCalculator,

    // Student
    "citation-generator": CitationGenerator,
    "pomodoro-timer": PomodoroTimer,
    "final-grade-calculator": FinalGradeCalculator,
    "exam-countdown": ExamCountdown,
    "reading-time-estimator": ReadingTimeEstimator,
    "text-to-speech": TextToSpeech,

    // Web
    "qr-code-generator": QrCodeGenerator,
    "my-ip-address": MyIpFinder,
    "user-agent-viewer": UserAgentViewer,
    "screen-resolution": ScreenResolution,

    // Security
    "password-generator": PasswordGenerator,
    "password-strength-checker": PasswordStrength,
    "rsa-key-generator": RsaGenerator,
    "uuid-generator": UuidGenerator,

    // Social
    "youtube-thumbnail-downloader": YouTubeThumbnail,
    "tweet-preview": TweetPreview,
    "hashtag-generator": HashtagGenerator,
};

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const tool = tools.find((t) => t.slug === slug);

    if (!tool) {
        return {
            title: "Tool Not Found",
        };
    }

    return {
        title: tool.seoTitle,
        description: tool.seoDescription,
    };
}

export async function generateStaticParams() {
    return tools.map((tool) => ({
        slug: tool.slug,
    }));
}

export default async function ToolPage({ params }: PageProps) {
    const { slug } = await params;
    const tool = tools.find((t) => t.slug === slug);

    if (!tool) {
        notFound();
    }

    const Component = TOOL_COMPONENTS[slug];

    return (
        <ToolLayout tool={tool}>
            {Component ? <Component /> : <div className="p-4 text-center">Tool Implementation Coming Soon</div>}
        </ToolLayout>
    );
}
