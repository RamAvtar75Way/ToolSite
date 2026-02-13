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

// Text Advanced
import { TextDiffChecker } from "@/components/tools/text-advanced/TextDiffChecker";
import { FindReplaceTool } from "@/components/tools/text-advanced/FindReplaceTool";
import { RemoveDuplicateWords } from "@/components/tools/text-advanced/RemoveDuplicateWords";
import { NgramGenerator } from "@/components/tools/text-advanced/NgramGenerator";
import { KeywordExtractor } from "@/components/tools/text-advanced/KeywordExtractor";
import { SentenceSplitter } from "@/components/tools/text-advanced/SentenceSplitter";
import { TextShuffleTool } from "@/components/tools/text-advanced/TextShuffleTool";
import { RemoveEmojis } from "@/components/tools/text-advanced/RemoveEmojis";
import { ExtractEmails } from "@/components/tools/text-advanced/ExtractEmails";
import { ExtractUrls } from "@/components/tools/text-advanced/ExtractUrls";

// File & Data Tools
import { CsvToJson } from "@/components/tools/data/CsvToJson";
import { JsonToCsv } from "@/components/tools/data/JsonToCsv";
import { CsvViewer } from "@/components/tools/data/CsvViewer";
import { TsvViewer } from "@/components/tools/data/TsvViewer";
import { JsonTreeViewer } from "@/components/tools/data/JsonTreeViewer";
import { JsonDiffChecker } from "@/components/tools/data/JsonDiffChecker";
import { XmlFormatter } from "@/components/tools/data/XmlFormatter";
import { XmlToJson } from "@/components/tools/data/XmlToJson";

import { MarkdownPreviewer } from "@/components/tools/data/MarkdownPreviewer";
import { MarkdownToHtml } from "@/components/tools/data/MarkdownToHtml";

// Math Tools
import { ScientificCalculator } from "@/components/tools/math/ScientificCalculator";
import { FractionCalculator } from "@/components/tools/math/FractionCalculator";
import { PrimeNumberChecker } from "@/components/tools/math/PrimeNumberChecker";
import { NumberToWordsConverter } from "@/components/tools/math/NumberToWordsConverter";
import { RomanNumeralConverter } from "@/components/tools/math/RomanNumeralConverter";
import { RandomNumberGenerator } from "@/components/tools/math/RandomNumberGenerator";
import { StatisticsCalculator } from "@/components/tools/math/StatisticsCalculator";
import { RatioSimplifier } from "@/components/tools/math/RatioSimplifier";
import { PercentageIncreaseCalculator } from "@/components/tools/math/PercentageIncreaseCalculator";
import { CompoundInterestCalculator } from "@/components/tools/math/CompoundInterestCalculator";

// Design Tools
import { GradientGenerator } from "@/components/tools/design/GradientGenerator";
import { ColorPaletteGenerator } from "@/components/tools/design/ColorPaletteGenerator";
import { ContrastChecker } from "@/components/tools/design/ContrastChecker";
import { HexShadesGenerator } from "@/components/tools/design/HexShadesGenerator";
import { TailwindColorPreviewer } from "@/components/tools/design/TailwindColorPreviewer";
import { CssBoxShadowGenerator } from "@/components/tools/design/CssBoxShadowGenerator";
import { CssBorderRadiusGenerator } from "@/components/tools/design/CssBorderRadiusGenerator";
import { CssClipPathGenerator } from "@/components/tools/design/CssClipPathGenerator";
import { CssGlassmorphismGenerator } from "@/components/tools/design/CssGlassmorphismGenerator";
import { CssGridGenerator } from "@/components/tools/design/CssGridGenerator";

// Productivity Tools
import { CountdownTimer } from "@/components/tools/productivity/CountdownTimer";
import { Stopwatch } from "@/components/tools/productivity/Stopwatch";
import { WorldClock } from "@/components/tools/productivity/WorldClock";
import { TimeZoneConverter } from "@/components/tools/productivity/TimeZoneConverter";
import { MeetingTimeFinder } from "@/components/tools/productivity/MeetingTimeFinder";
import { WorkHoursCalculator } from "@/components/tools/productivity/WorkHoursCalculator";
import { HabitTracker } from "@/components/tools/productivity/HabitTracker";
import { DailyPlanner } from "@/components/tools/productivity/DailyPlanner";
import { FocusNoiseGenerator } from "@/components/tools/productivity/FocusNoiseGenerator";
import { BreakReminder } from "@/components/tools/productivity/BreakReminder";

// Formatting Tools
import { Rot13Encoder } from "@/components/tools/format/Rot13Encoder";
import { BinaryConverter } from "@/components/tools/format/BinaryConverter";
import { AsciiConverter } from "@/components/tools/format/AsciiConverter";
import { UnicodeConverter } from "@/components/tools/format/UnicodeConverter";
import { TextToHexConverter } from "@/components/tools/format/TextToHexConverter";
import { HexToTextConverter } from "@/components/tools/format/HexToTextConverter";
import { HtmlTableGenerator } from "@/components/tools/format/HtmlTableGenerator";
import { SqlFormatter } from "@/components/tools/format/SqlFormatter";
import { SqlMinifier } from "@/components/tools/format/SqlMinifier";
import { CodeBeautifier } from "@/components/tools/format/CodeBeautifier";

// Language Tools
import { WordFrequencyAnalyzer } from "@/components/tools/language/WordFrequencyAnalyzer";
import { SentenceAnalyzer } from "@/components/tools/language/SentenceAnalyzer";
import { PangramChecker } from "@/components/tools/language/PangramChecker";
import { PalindromeChecker } from "@/components/tools/language/PalindromeChecker";
import { AnagramSolver } from "@/components/tools/language/AnagramSolver";
import { ReadabilityScorer } from "@/components/tools/language/ReadabilityScorer";
import { SyllableCounter } from "@/components/tools/language/SyllableCounter";
import { RhymeFinder } from "@/components/tools/language/RhymeFinder";
import { AlliterationFinder } from "@/components/tools/language/AlliterationFinder";
import { AcronymExtractor } from "@/components/tools/language/AcronymExtractor";

// Visualization Tools
import { PieChartGenerator } from "@/components/tools/visualization/PieChartGenerator";
import { BarChartGenerator } from "@/components/tools/visualization/BarChartGenerator";
import { LineChartGenerator } from "@/components/tools/visualization/LineChartGenerator";
import { CsvToChart } from "@/components/tools/visualization/CsvToChart";
import { SurveyVisualizer } from "@/components/tools/visualization/SurveyVisualizer";

// Validation Tools
import { EmailValidator } from "@/components/tools/validation/EmailValidator";
import { UrlValidator } from "@/components/tools/validation/UrlValidator";
import { CardValidator } from "@/components/tools/validation/CardValidator";
import { IbanValidator } from "@/components/tools/validation/IbanValidator";
import { PhoneValidator } from "@/components/tools/validation/PhoneValidator";
import { IpValidator } from "@/components/tools/validation/IpValidator";
import { DomainValidator } from "@/components/tools/validation/DomainValidator";

// Generator Tools
import { RandomNameGenerator } from "@/components/tools/generators/RandomNameGenerator";
import { FakeAddressGenerator } from "@/components/tools/generators/FakeAddressGenerator";
import { UsernameGenerator } from "@/components/tools/generators/UsernameGenerator";
import { ProjectNameGenerator } from "@/components/tools/generators/ProjectNameGenerator";
import { StartupNameGenerator } from "@/components/tools/generators/StartupNameGenerator";
import { RandomColorGenerator } from "@/components/tools/generators/RandomColorGenerator";
import { LoremIpsumGenerator } from "@/components/tools/generators/LoremIpsumGenerator";
import { DummyJsonGenerator } from "@/components/tools/generators/DummyJsonGenerator";
import { DummyCsvGenerator } from "@/components/tools/generators/DummyCsvGenerator";
import { TestDataGenerator } from "@/components/tools/generators/TestDataGenerator";

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
import { HeadingStructureChecker } from "@/components/tools/seo/HeadingStructureChecker";

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
import { NotesFormatter } from "@/components/tools/student/NotesFormatter";

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
import { BioLinkBuilder } from "@/components/tools/social/BioLinkBuilder";
import { CharacterLimitChecker } from "@/components/tools/social/CharacterLimitChecker";

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

    // Text Advanced
    "text-diff-checker": TextDiffChecker,
    "find-and-replace": FindReplaceTool,
    "remove-duplicate-words": RemoveDuplicateWords,
    "ngram-generator": NgramGenerator,
    "keyword-extractor": KeywordExtractor,
    "sentence-splitter": SentenceSplitter,
    "text-shuffle": TextShuffleTool,
    "remove-emojis": RemoveEmojis,
    "extract-emails": ExtractEmails,
    "extract-urls": ExtractUrls,

    // File & Data Tools
    "csv-to-json": CsvToJson,
    "json-to-csv": JsonToCsv,
    "csv-viewer": CsvViewer,
    "tsv-viewer": TsvViewer,
    "json-tree-viewer": JsonTreeViewer,
    "json-diff-checker": JsonDiffChecker,
    "xml-formatter": XmlFormatter,
    "xml-to-json": XmlToJson,
    "markdown-previewer": MarkdownPreviewer,
    "markdown-to-html": MarkdownToHtml,

    // Math Tools
    "scientific-calculator": ScientificCalculator,
    "fraction-calculator": FractionCalculator,
    "prime-number-checker": PrimeNumberChecker,
    "number-to-words": NumberToWordsConverter,
    "roman-numeral-converter": RomanNumeralConverter,
    "random-number-generator": RandomNumberGenerator,
    "statistics-calculator": StatisticsCalculator,
    "ratio-simplifier": RatioSimplifier,
    "percentage-increase-calculator": PercentageIncreaseCalculator,
    "compound-interest-calculator": CompoundInterestCalculator,

    // Design Tools
    "gradient-generator": GradientGenerator,
    "color-palette-generator": ColorPaletteGenerator,
    "contrast-checker": ContrastChecker,
    "hex-shades-generator": HexShadesGenerator,
    "tailwind-color-previewer": TailwindColorPreviewer,
    "css-box-shadow-generator": CssBoxShadowGenerator,
    "css-border-radius-generator": CssBorderRadiusGenerator,
    "css-clip-path-generator": CssClipPathGenerator,
    "css-glassmorphism-generator": CssGlassmorphismGenerator,
    "css-grid-generator": CssGridGenerator,

    // Productivity Tools
    "countdown-timer": CountdownTimer,
    "stopwatch": Stopwatch,
    "world-clock": WorldClock,
    "time-zone-converter": TimeZoneConverter,
    "meeting-time-finder": MeetingTimeFinder,
    "work-hours-calculator": WorkHoursCalculator,
    "habit-tracker": HabitTracker,
    "daily-planner": DailyPlanner,
    "focus-noise-generator": FocusNoiseGenerator,
    "break-reminder": BreakReminder,

    // Formatting Tools
    "rot13-encoder": Rot13Encoder,
    "binary-converter": BinaryConverter,
    "ascii-converter": AsciiConverter,
    "unicode-converter": UnicodeConverter,
    "text-to-hex": TextToHexConverter,
    "hex-to-text": HexToTextConverter,
    "html-table-generator": HtmlTableGenerator,
    "sql-formatter": SqlFormatter,
    "sql-minifier": SqlMinifier,
    "code-beautifier": CodeBeautifier,

    // Language Tools
    "word-frequency-analyzer": WordFrequencyAnalyzer,
    "sentence-structure-analyzer": SentenceAnalyzer,
    "pangram-checker": PangramChecker,
    "palindrome-checker": PalindromeChecker,
    "anagram-solver": AnagramSolver,
    "text-readability-scorer": ReadabilityScorer,
    "syllable-counter": SyllableCounter,
    "rhyme-finder": RhymeFinder,
    "alliteration-finder": AlliterationFinder,
    "acronym-extractor": AcronymExtractor,

    // Visualization Tools
    "pie-chart-generator": PieChartGenerator,
    "bar-chart-generator": BarChartGenerator,
    "line-chart-generator": LineChartGenerator,
    "csv-to-chart": CsvToChart,
    "survey-result-visualizer": SurveyVisualizer,

    // Validation Tools
    "email-validator": EmailValidator,
    "url-validator": UrlValidator,
    "card-validator": CardValidator,
    "iban-validator": IbanValidator,
    "phone-validator": PhoneValidator,
    "ip-validator": IpValidator,
    "domain-validator": DomainValidator,

    // Generators
    "random-name-generator": RandomNameGenerator,
    "fake-address-generator": FakeAddressGenerator,
    "username-generator": UsernameGenerator,
    "project-name-generator": ProjectNameGenerator,
    "startup-name-generator": StartupNameGenerator,
    "random-color-generator": RandomColorGenerator,
    "lorem-ipsum-generator": LoremIpsumGenerator,
    "dummy-json-generator": DummyJsonGenerator,
    "dummy-csv-generator": DummyCsvGenerator,
    "test-data-generator": TestDataGenerator,

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
    "heading-structure-checker": HeadingStructureChecker,

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
    "notes-formatter": NotesFormatter,

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
    "bio-link-builder": BioLinkBuilder,
    "character-limit-checker": CharacterLimitChecker,
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
