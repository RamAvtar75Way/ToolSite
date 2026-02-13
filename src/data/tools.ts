import { LucideIcon } from "lucide-react";



export type ToolCategory = "text" | "text-advanced" | "data" | "math" | "design" | "productivity" | "format" | "language" | "visualization" | "validation" | "generator" | "developer" | "image" | "seo" | "calculator" | "student" | "web" | "security" | "social";
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
import { PieChartGenerator } from "@/components/tools/visualization/PieChartGenerator";
import { BarChartGenerator } from "@/components/tools/visualization/BarChartGenerator";
import { LineChartGenerator } from "@/components/tools/visualization/LineChartGenerator";
import { CsvToChart } from "@/components/tools/visualization/CsvToChart";
import { SurveyVisualizer } from "@/components/tools/visualization/SurveyVisualizer";
import { EmailValidator } from "@/components/tools/validation/EmailValidator";
import { UrlValidator } from "@/components/tools/validation/UrlValidator";
import { CardValidator } from "@/components/tools/validation/CardValidator";
import { IbanValidator } from "@/components/tools/validation/IbanValidator";
import { PhoneValidator } from "@/components/tools/validation/PhoneValidator";
import { IpValidator } from "@/components/tools/validation/IpValidator";
import { DomainValidator } from "@/components/tools/validation/DomainValidator";
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
export interface ToolConfig {
    slug: string;
    name: string;
    category: ToolCategory;
    description: string;
    seoTitle: string;
    seoDescription: string;
    icon?: LucideIcon;
}

export const tools: ToolConfig[] = [
    // Text Tools
    {
        slug: "word-counter",
        name: "Word Counter",
        category: "text",
        description: "Count words, characters, sentences, and paragraphs in your text.",
        seoTitle: "Free Online Word Counter - Text Analysis Tool",
        seoDescription: "A free online word counter tool. Count words, characters, sentences, and paragraphs instantly.",
    },
    {
        slug: "character-counter",
        name: "Character Counter",
        category: "text",
        description: "Check character limits for social media platforms.",
        seoTitle: "Character Counter & Checker - Social Media Limits",
        seoDescription: "Calculate character count for Twitter, Facebook, Instagram, and more.",
    },
    {
        slug: "case-converter",
        name: "Case Converter",
        category: "text",
        description: "Convert text between Uppercase, Lowercase, Title Case, and more.",
        seoTitle: "Case Converter - Uppercase, Lowercase, Title Case Tool",
        seoDescription: "Easily convert text case online. Switch between uppercase, lowercase, title case, and sentence case.",
    },
    {
        slug: "remove-extra-spaces",
        name: "Remove Extra Spaces",
        category: "text",
        description: "Remove unnecessary spaces, tabs, and line breaks from text.",
        seoTitle: "Remove Extra Spaces - Text Cleaner Tool",
        seoDescription: "Clean up your text by removing multiple spaces, leading/trailing whitespace, and empty lines.",
    },
    {
        slug: "slug-generator",
        name: "Slug Generator",
        category: "text",
        description: "Generate SEO-friendly URL slugs from text strings.",
        seoTitle: "URL Slug Generator - SEO Friendly Link Creator",
        seoDescription: "Create clean, SEO-friendly URL slugs from any text title.",
    },
    {
        slug: "text-sorter",
        name: "Text Sorter",
        category: "text",
        description: "Sort text lines alphabetically (A-Z, Z-A), by length, or randomly.",
        seoTitle: "Online Text Sorter - Alphabetize List",
        seoDescription: "Sort your lists alphabetically, numerically, or by length instantly.",
    },
    {
        slug: "duplicate-line-remover",
        name: "Duplicate Line Remover",
        category: "text",
        description: "Find and remove duplicate lines from your text list.",
        seoTitle: "Remove Duplicate Lines - List Cleaner",
        seoDescription: "Remove duplicate lines from text automatically. Clean up your data lists.",
    },
    {
        slug: "text-reverser",
        name: "Text Reverser",
        category: "text",
        description: "Reverse text, words, or letters instantly.",
        seoTitle: "Text Reverser - Reverse Words and Letters",
        seoDescription: "An online tool to reverse text, flip words, and mirror strings.",
    },
    // Text Processing Advanced
    {
        slug: "text-diff-checker",
        name: "Text Diff Checker",
        category: "text-advanced",
        description: "Compare two texts and highlight differences (chars, words, lines).",
        seoTitle: "Online Text Diff Checker - Compare Two Texts",
        seoDescription: "Compare two text files or strings. Highlight differences in characters, words, or lines.",
    },
    {
        slug: "find-and-replace",
        name: "Find & Replace Tool",
        category: "text-advanced",
        description: "Find and replace text with support for Regex and Case Sensitivity.",
        seoTitle: "Online Find and Replace Tool - Regex Support",
        seoDescription: "Find and replace text online. Supports Regular Expressions (Regex) and Case Sensitivity.",
    },
    {
        slug: "remove-duplicate-words",
        name: "Remove Duplicate Words",
        category: "text-advanced",
        description: "Remove duplicate words from your text.",
        seoTitle: "Remove Duplicate Words - Text Cleaner",
        seoDescription: "Find and remove repeated words from your text automatically.",
    },
    {
        slug: "ngram-generator",
        name: "N-gram Generator",
        category: "text-advanced",
        description: "Generate N-grams (Bigrams, Trigrams) from text.",
        seoTitle: "N-gram Generator - Bigrams, Trigrams, N-grams",
        seoDescription: "Generate N-grams from text. Analyze word sequences and frequencies.",
    },
    {
        slug: "keyword-extractor",
        name: "Keyword Extractor",
        category: "text-advanced",
        description: "Extract most frequent keywords from text (excluding stop words).",
        seoTitle: "Online Keyword Extractor - Analyze Word Frequency",
        seoDescription: "Extract top keywords and key phrases from text. Analyze content density.",
    },
    {
        slug: "sentence-splitter",
        name: "Sentence Splitter",
        category: "text-advanced",
        description: "Split text into separate sentences line by line.",
        seoTitle: "Sentence Splitter - Break Text into Sentences",
        seoDescription: "Split paragraphs into individual sentences. Useful for text analysis and formatting.",
    },
    {
        slug: "text-shuffle",
        name: "Text Shuffle Tool",
        category: "text-advanced",
        description: "Randomize lines or words in your text.",
        seoTitle: "Text Shuffle Tool - Randomize Words and Lines",
        seoDescription: "Shuffle text lines or words randomly. Create jumbled text or randomize lists.",
    },
    {
        slug: "remove-emojis",
        name: "Remove Emojis",
        category: "text-advanced",
        description: "Remove all emojis from text.",
        seoTitle: "Remove Emojis from Text - Clean Text Tool",
        seoDescription: "Strip emojis and pictographs from your text strings instantly.",
    },
    {
        slug: "extract-emails",
        name: "Extract Emails",
        category: "text-advanced",
        description: "Extract all email addresses from text.",
        seoTitle: "Email Extractor - Find Emails in Text",
        seoDescription: "Extract and list all email addresses found in your text content.",
    },
    {
        slug: "extract-urls",
        name: "Extract URLs",
        category: "text-advanced",
        description: "Extract all HTTP/HTTPS links from text.",
        seoTitle: "URL Extractor - Find Links in Text",
        seoDescription: "Extract and list all URLs and links found in your text content.",
    },
    // File & Data Tools
    {
        slug: "csv-to-json",
        name: "CSV to JSON",
        category: "data",
        description: "Convert CSV data to JSON objects.",
        seoTitle: "CSV to JSON Converter - Online Tool",
        seoDescription: "Convert CSV files or text to JSON format instantly in your browser.",
    },
    {
        slug: "json-to-csv",
        name: "JSON to CSV",
        category: "data",
        description: "Convert JSON data to CSV format.",
        seoTitle: "JSON to CSV Converter - Online Tool",
        seoDescription: "Convert JSON arrays/objects to CSV files or text instantly.",
    },
    {
        slug: "csv-viewer",
        name: "CSV Viewer",
        category: "data",
        description: "View and analyze CSV files in a table format.",
        seoTitle: "Online CSV Viewer - Visualize Data",
        seoDescription: "Upload and view CSV files in a readable table format with headers.",
    },
    {
        slug: "tsv-viewer",
        name: "TSV Viewer",
        category: "data",
        description: "View and analyze TSV (Tab Separated Values) files.",
        seoTitle: "Online TSV Viewer - Visualize Data",
        seoDescription: "Upload and view TSV files in a table format. Supports tab-delimited data.",
    },
    {
        slug: "json-tree-viewer",
        name: "JSON Tree Viewer",
        category: "data",
        description: "Visualize JSON data in an interactive tree structure.",
        seoTitle: "JSON Tree Viewer - Visualize JSON Structure",
        seoDescription: "View, explore, and debug JSON data with an interactive collapsible tree view.",
    },
    {
        slug: "json-diff-checker",
        name: "JSON Diff Checker",
        category: "data",
        description: "Compare two JSON objects and highlight differences.",
        seoTitle: "JSON Diff Checker - Compare JSON Files",
        seoDescription: "Compare two JSON inputs and see added, removed, or changed values.",
    },
    {
        slug: "xml-formatter",
        name: "XML Formatter",
        category: "data",
        description: "Format and beautify XML strings.",
        seoTitle: "XML Formatter & Beautifier - Pretty Print XML",
        seoDescription: "Format messy XML code into a readable, indented structure.",
    },
    {
        slug: "xml-to-json",
        name: "XML to JSON",
        category: "data",
        description: "Convert XML data to JSON format.",
        seoTitle: "XML to JSON Converter - Online Tool",
        seoDescription: "Convert XML files or strings to JSON format directly in the browser.",
    },
    {
        slug: "markdown-previewer",
        name: "Markdown Previewer",
        category: "data",
        description: "Preview Markdown text as HTML.",
        seoTitle: "Markdown Previewer - Live Editor",
        seoDescription: "Type Markdown and see the live HTML preview instantly.",
    },
    {
        slug: "markdown-to-html",
        name: "Markdown to HTML",
        category: "data",
        description: "Convert Markdown syntax to raw HTML code.",
        seoTitle: "Markdown to HTML Converter - Online Tool",
        seoDescription: "Convert Markdown content to clean HTML code for your website.",
    },
    // Math & Number Tools
    {
        slug: "scientific-calculator",
        name: "Scientific Calculator",
        category: "math",
        description: "Advanced scientific calculator with trigonometry and logs.",
        seoTitle: "Online Scientific Calculator - Trig, Logs, Exponents",
        seoDescription: "Free online scientific calculator with sin, cos, tan, log, and more.",
    },
    {
        slug: "fraction-calculator",
        name: "Fraction Calculator",
        category: "math",
        description: "Add, subtract, multiply, and divide fractions.",
        seoTitle: "Fraction Calculator - Add, Subtract, Multiply, Divide",
        seoDescription: "Calculate fractions instantly. Supports addition, subtraction, multiplication, and division.",
    },
    {
        slug: "prime-number-checker",
        name: "Prime Number Checker",
        category: "math",
        description: "Check if a number is prime and see why.",
        seoTitle: "Prime Number Checker - Is it Prime?",
        seoDescription: "Instantly check if a number is prime. Explains factors and divisibility.",
    },
    {
        slug: "number-to-words",
        name: "Number to Words",
        category: "math",
        description: "Convert numbers into text (e.g. 123 -> One Hundred Twenty Three).",
        seoTitle: "Number to Words Converter - Spell Out Numbers",
        seoDescription: "Convert digits to words. Useful for checks and legal documents.",
    },
    {
        slug: "roman-numeral-converter",
        name: "Roman Numeral Converter",
        category: "math",
        description: "Convert between Roman Numerals and Numbers.",
        seoTitle: "Roman Numeral Converter - Roman to Decimal",
        seoDescription: "Convert Roman numerals to numbers and vice versa instantly.",
    },
    {
        slug: "random-number-generator",
        name: "Random Number Generator",
        category: "math",
        description: "Generate random numbers within a specific range.",
        seoTitle: "Random Number Generator - Pick a Number",
        seoDescription: "Generate random integers within a range. Useful for lotteries and games.",
    },
    {
        slug: "statistics-calculator",
        name: "Statistics Calculator",
        category: "math",
        description: "Calculate Mean, Median, Mode, Range, and Standard Deviation.",
        seoTitle: "Statistics Calculator - Mean, Median, Mode",
        seoDescription: "Calculate basic statistics from a dataset: mean, median, mode, range, and standard deviation.",
    },
    {
        slug: "ratio-simplifier",
        name: "Ratio Simplifier",
        category: "math",
        description: "Simplify ratios to their lowest terms.",
        seoTitle: "Ratio Simplifier - Reduce Ratios Online",
        seoDescription: "Simplify mathematical ratios to their simplest form instantly.",
    },
    {
        slug: "percentage-increase-calculator",
        name: "Percentage Increase",
        category: "math",
        description: "Calculate percentage increase or decrease between two values.",
        seoTitle: "Percentage Increase Calculator - Growth & Difference",
        seoDescription: "Calculate percentage difference, increase, or decrease between two numbers.",
    },
    {
        slug: "compound-interest-calculator",
        name: "Compound Interest",
        category: "math",
        description: "Calculate compound interest over time.",
        seoTitle: "Compound Interest Calculator - Investment Growth",
        seoDescription: "Calculate compound interest on investments with customizable frequency and rates.",
    },
    // Color & Design Tools
    {
        slug: "gradient-generator",
        name: "Gradient Generator",
        category: "design",
        description: "Create beautiful CSS gradients.",
        seoTitle: "CSS Gradient Generator - Linear & Radial",
        seoDescription: "Generate linear and radial CSS gradients with multiple color stops.",
    },
    {
        slug: "color-palette-generator",
        name: "Color Palette Generator",
        category: "design",
        description: "Generate harmonious color palettes.",
        seoTitle: "Color Palette Generator - Monochromatic, Analogous, Triad",
        seoDescription: "Create perfect color palettes using harmony rules like complementary and triadic.",
    },
    {
        slug: "contrast-checker",
        name: "Contrast Checker",
        category: "design",
        description: "Check color contrast for accessibility (WCAG).",
        seoTitle: "WCAG Contrast Checker - Accessibility Tool",
        seoDescription: "Ensure your text is readable with this WCAG color contrast ratio checker.",
    },
    {
        slug: "hex-shades-generator",
        name: "Hex Shades Generator",
        category: "design",
        description: "Generate tints and shades for any color.",
        seoTitle: "Hex Color Shades & Tints Generator",
        seoDescription: "Generate lighter tints and darker shades for any hex color code.",
    },
    {
        slug: "tailwind-color-previewer",
        name: "Tailwind Color Previewer",
        category: "design",
        description: "Browse and copy Tailwind CSS colors.",
        seoTitle: "Tailwind CSS Color Palette Previewer",
        seoDescription: "Visual guide to all default Tailwind CSS colors and shades.",
    },
    {
        slug: "css-box-shadow-generator",
        name: "Box Shadow Generator",
        category: "design",
        description: "Create custom CSS box-shadows visually.",
        seoTitle: "CSS Box Shadow Generator - Visual Tool",
        seoDescription: "Generate complex CSS box-shadows with preview and code copy.",
    },
    {
        slug: "css-border-radius-generator",
        name: "Border Radius Generator",
        category: "design",
        description: "Visually tweak CSS border-radius.",
        seoTitle: "CSS Border Radius Generator - Rounded Corners",
        seoDescription: "Create custom border-radius shapes and copy the CSS code.",
    },
    {
        slug: "css-clip-path-generator",
        name: "Clip Path Generator",
        category: "design",
        description: "Generate CSS clip-path shapes.",
        seoTitle: "CSS Clip Path Generator - Custom Shapes",
        seoDescription: "Create CSS shapes like triangles, polygons, and stars using clip-path.",
    },
    {
        slug: "css-glassmorphism-generator",
        name: "Glassmorphism Generator",
        category: "design",
        description: "Generate the frosted glass effect (CSS backdrop-filter).",
        seoTitle: "CSS Glassmorphism Generator - Glass Effect",
        seoDescription: "Create modern frosted glass UI strength and transparency controls.",
    },
    {
        slug: "css-grid-generator",
        name: "CSS Grid Generator",
        category: "design",
        description: "Generate basic CSS Grid layouts.",
        seoTitle: "CSS Grid Layout Generator",
        seoDescription: "Create responsive CSS grid layouts with rows, columns, and gaps.",
    },
    // Time & Productivity Tools
    {
        slug: "countdown-timer",
        name: "Countdown Timer",
        category: "productivity",
        description: "Simple online countdown timer.",
        seoTitle: "Online Countdown Timer - Set Alarm",
        seoDescription: "Free online countdown timer with alarm sound.",
    },
    {
        slug: "stopwatch",
        name: "Stopwatch",
        category: "productivity",
        description: "Online stopwatch with lap tracking.",
        seoTitle: "Online Stopwatch - Count Up Timer",
        seoDescription: "Accurate online stopwatch with lap recording features.",
    },
    {
        slug: "world-clock",
        name: "World Clock",
        category: "productivity",
        description: "View current time across multiple time zones.",
        seoTitle: "World Clock - Current Time Worldwide",
        seoDescription: "Check current local time in major cities around the world.",
    },
    {
        slug: "time-zone-converter",
        name: "Time Zone Converter",
        category: "productivity",
        description: "Convert time between different time zones.",
        seoTitle: "Time Zone Converter - Difference Calculator",
        seoDescription: "Convert meeting times between different time zones easily.",
    },
    {
        slug: "meeting-time-finder",
        name: "Meeting Time Finder",
        category: "productivity",
        description: "Find overlapping working hours for international teams.",
        seoTitle: "International Meeting Planner - Time Finder",
        seoDescription: "Find the best meeting time across multiple time zones.",
    },
    {
        slug: "work-hours-calculator",
        name: "Work Hours Calculator",
        category: "productivity",
        description: "Calculate working hours between two times.",
        seoTitle: "Work Hours Calculator - Time Card",
        seoDescription: "Calculate total work hours minus break times.",
    },
    {
        slug: "habit-tracker",
        name: "Habit Streak Tracker",
        category: "productivity",
        description: "Track your daily habits and building streaks.",
        seoTitle: "Online Habit Tracker - Daily Goals",
        seoDescription: "Simple habit tracker that saves your progress locally.",
    },
    {
        slug: "daily-planner",
        name: "Daily Planner",
        category: "productivity",
        description: "Simple daily todo list.",
        seoTitle: "Daily Planner - Todo List Online",
        seoDescription: "Manage your daily tasks with this simple online planner.",
    },
    {
        slug: "focus-noise-generator",
        name: "Focus Noise",
        category: "productivity",
        description: "Play White, Pink, and Brown noise for focus.",
        seoTitle: "White Noise Generator - Focus & Sleep",
        seoDescription: "Generate White, Pink, and Brown noise to improve focus or sleep.",
    },
    {
        slug: "break-reminder",
        name: "Break Reminder",
        category: "productivity",
        description: "Timer to remind you to take breaks.",
        seoTitle: "Break Reminder - Pomodoro Style Timer",
        seoDescription: "Stay healthy with regular break reminders while working.",
    },
    // Encoding & Formatting Tools
    {
        slug: "rot13-encoder",
        name: "ROT13 Encoder",
        category: "format",
        description: "Encode or decode text using ROT13 cipher.",
        seoTitle: "ROT13 Encoder/Decoder - Online Cipher",
        seoDescription: "Simple ROT13 encryption and decryption tool.",
    },
    {
        slug: "binary-converter",
        name: "Binary Converter",
        category: "format",
        description: "Convert text to binary and vice versa.",
        seoTitle: "Text to Binary Converter - 01001000",
        seoDescription: "Translates text into binary code and binary back to text.",
    },
    {
        slug: "ascii-converter",
        name: "ASCII Converter",
        category: "format",
        description: "Convert text to ASCII decimal values.",
        seoTitle: "ASCII Code Converter - Text to Decimal",
        seoDescription: "Convert characters to their corresponding ASCII decimal codes.",
    },
    {
        slug: "unicode-converter",
        name: "Unicode Converter",
        category: "format",
        description: "Convert text to Unicode escape sequences.",
        seoTitle: "Unicode Escaper - Text to Unicode",
        seoDescription: "Converts text characters to Unicode escape sequences (\\uXXXX).",
    },
    {
        slug: "text-to-hex",
        name: "Text to Hex Converter",
        category: "format",
        description: "Convert text to hexadecimal string.",
        seoTitle: "Text to Hex Converter - Hexadecimal Encode",
        seoDescription: "Convert any text string to its hexadecimal representation.",
    },
    {
        slug: "hex-to-text",
        name: "Hex to Text Converter",
        category: "format",
        description: "Convert hexadecimal string back to text.",
        seoTitle: "Hex to Text Converter - Decode Hex",
        seoDescription: "Decode hexadecimal strings back to readable text.",
    },
    {
        slug: "html-table-generator",
        name: "HTML Table Generator",
        category: "format",
        description: "Generate HTML table from CSV or text.",
        seoTitle: "HTML Table Generator - CSV to HTML",
        seoDescription: "Convert CSV or tab-separated data into an HTML table.",
    },
    {
        slug: "sql-formatter",
        name: "SQL Formatter",
        category: "format",
        description: "Prettify and format SQL queries.",
        seoTitle: "Online SQL Formatter - Beautify SQL",
        seoDescription: "Format complex SQL queries to make them readable.",
    },
    {
        slug: "sql-minifier",
        name: "SQL Minifier",
        category: "format",
        description: "Compress SQL queries into a single line.",
        seoTitle: "SQL Minifier - Compress SQL",
        seoDescription: "Remove whitespaces from SQL to make it compact.",
    },
    {
        slug: "code-beautifier",
        name: "Code Beautifier",
        category: "format",
        description: "Simple JSON and HTML beautifier.",
        seoTitle: "Code Beautifier - JSON & HTML",
        seoDescription: "Format and indent JSON and HTML code.",
    },
    // Language Tools (No AI)
    {
        slug: "word-frequency-analyzer",
        name: "Word Frequency Analyzer",
        category: "language",
        description: "Analyze word count and frequency in text.",
        seoTitle: "Word Frequency Counter - Text Analysis",
        seoDescription: "Count word occurrences and analyze text frequency.",
    },
    {
        slug: "sentence-structure-analyzer",
        name: "Sentence Structure Analyzer",
        category: "language",
        description: "Analyze sentence length and structure.",
        seoTitle: "Sentence Length Analyzer - Text Stats",
        seoDescription: "Calculate average sentence length and find longest/shortest sentences.",
    },
    {
        slug: "pangram-checker",
        name: "Pangram Checker",
        category: "language",
        description: "Check if text contains every letter of the alphabet.",
        seoTitle: "Pangram Checker - A-Z Check",
        seoDescription: "Verify if a sentence is a pangram (contains all alphabet letters).",
    },
    {
        slug: "palindrome-checker",
        name: "Palindrome Checker",
        category: "language",
        description: "Check if text reads the same backwards.",
        seoTitle: "Palindrome Checker - Reverse Text Check",
        seoDescription: "Check if a word or phrase is a palindrome.",
    },
    {
        slug: "anagram-solver",
        name: "Anagram Checker", // Renamed to accurately reflect functionality
        category: "language",
        description: "Check if two words are anagrams.",
        seoTitle: "Anagram Checker - Word Scramble",
        seoDescription: "Verify if two words or phrases are anagrams of each other.",
    },
    {
        slug: "text-readability-scorer",
        name: "Readability Scorer",
        category: "language",
        description: "Check reading level (Flesch-Kincaid).",
        seoTitle: "Readability Score Calculator - Flesch-Kincaid",
        seoDescription: "Calculate the Flesch-Kincaid reading grade level of your text.",
    },
    {
        slug: "syllable-counter",
        name: "Syllable Counter",
        category: "language",
        description: "Estimate syllable count in words.",
        seoTitle: "Syllable Counter - Word Breakdown",
        seoDescription: "Count the number of syllables in your text.",
    },
    {
        slug: "rhyme-finder",
        name: "Rhyme Scheme Analyzer",
        category: "language",
        description: "Analyze rhyme patterns in poems.",
        seoTitle: "Rhyme Scheme Finder - Poem Analysis",
        seoDescription: "Identify rhyme schemes (AABB, ABAB) in poetry.",
    },
    {
        slug: "alliteration-finder",
        name: "Alliteration Finder",
        category: "language",
        description: "Find repetitive starting sounds in text.",
        seoTitle: "Alliteration Detector - Literary Devices",
        seoDescription: "Highlight alliteration and consonant repetition in text.",
    },
    {
        slug: "acronym-extractor",
        name: "Acronym Extractor",
        category: "language",
        description: "Find acronyms and capitalized terms.",
        seoTitle: "Acronym Finder - Extract Capitalized Words",
        seoDescription: "Extract potential acronyms from text.",
    },
    // Data Visualization
    {
        slug: "pie-chart-generator",
        name: "Pie Chart Generator",
        category: "visualization",
        description: "Create simple pie charts from data.",
        seoTitle: "Online Pie Chart Maker - Visualize Data",
        seoDescription: "Generate pie charts quickly for your data.",
    },
    {
        slug: "bar-chart-generator",
        name: "Bar Chart Generator",
        category: "visualization",
        description: "Create bar charts from data.",
        seoTitle: "Free Bar Chart Maker - Online Graph Tool",
        seoDescription: "Create professional bar charts instantly.",
    },
    {
        slug: "line-chart-generator",
        name: "Line Chart Generator",
        category: "visualization",
        description: "Create line charts to show trends.",
        seoTitle: "Line Graph Maker - Trend Visualization",
        seoDescription: "Plot line graphs to visualize data trends over time.",
    },
    {
        slug: "csv-to-chart",
        name: "CSV to Chart",
        category: "visualization",
        description: "Convert CSV data into visual charts.",
        seoTitle: "CSV to Graph - Visualize Spreadsheet Data",
        seoDescription: "Paste CSV data and generate instant charts.",
    },
    {
        slug: "survey-result-visualizer",
        name: "Survey Visualizer",
        category: "visualization",
        description: "Visualize survey results and polls.",
        seoTitle: "Survey Data Visualizer - Chart Maker",
        seoDescription: "Create visuals for survey responses and poll data.",
    },
    // Validation Tools
    {
        slug: "email-validator",
        name: "Email Validator",
        category: "validation",
        description: "Check if an email address is valid.",
        seoTitle: "Email Address Validator - Syntax Check",
        seoDescription: "Validate email address syntax instantly.",
    },
    {
        slug: "url-validator",
        name: "URL Validator",
        category: "validation",
        description: "Check if a URL is structured correctly.",
        seoTitle: "URL Validity Checker - Link Syntax",
        seoDescription: "Verify website URL formats and syntax.",
    },
    {
        slug: "card-validator",
        name: "Credit Card Validator",
        category: "validation",
        description: "Validate credit card numbers (Luhn check).",
        seoTitle: "Credit Card Number Validator - Luhn Check",
        seoDescription: "Verify credit card numbers using the Luhn algorithm.",
    },
    {
        slug: "iban-validator",
        name: "IBAN Validator",
        category: "validation",
        description: "Validate International Bank Account Numbers.",
        seoTitle: "IBAN Checker - Validate Bank Accounts",
        seoDescription: "Check if an IBAN code is valid and correct.",
    },
    {
        slug: "phone-validator",
        name: "Phone Number Validator",
        category: "validation",
        description: "Check if a phone number is valid.",
        seoTitle: "Phone Number Checker - International Format",
        seoDescription: "Validate mobile phone numbers for different countries.",
    },
    {
        slug: "ip-validator",
        name: "IP Address Validator",
        category: "validation",
        description: "Validate IPv4 and IPv6 addresses.",
        seoTitle: "IP Address Checker - IPv4 & IPv6",
        seoDescription: "Check if an IP address is valid.",
    },
    {
        slug: "domain-validator",
        name: "Domain Validator",
        category: "validation",
        description: "Check if a domain name is valid.",
        seoTitle: "Domain Name Checker - Syntax Validation",
        seoDescription: "Validate domain name syntax and structure.",
    },
    // Generator Tools
    {
        slug: "random-name-generator",
        name: "Random Name Generator",
        category: "generator",
        description: "Generate random names for characters or testing.",
        seoTitle: "Random Name Generator - Fake Names",
        seoDescription: "Generate lists of random first and last names.",
    },
    {
        slug: "fake-address-generator",
        name: "Fake Address Generator",
        category: "generator",
        description: "Generate realistic-looking fake addresses.",
        seoTitle: "Fake Address Generator - Test Data",
        seoDescription: "Generate random US-style addresses for testing.",
    },
    {
        slug: "username-generator",
        name: "Username Generator",
        category: "generator",
        description: "Generate unique usernames from keywords.",
        seoTitle: "Username Generator - Social Media Names",
        seoDescription: "Create cool and unique usernames for your profiles.",
    },
    {
        slug: "project-name-generator",
        name: "Project Name Generator",
        category: "generator",
        description: "Generate creative names for your projects.",
        seoTitle: "Project Name Generator - Code & Business",
        seoDescription: "Get ideas for your next project name.",
    },
    {
        slug: "startup-name-generator",
        name: "Startup Name Generator",
        category: "generator",
        description: "Generate catchy names for startups.",
        seoTitle: "Startup Name Generator - Business Names",
        seoDescription: "Create modern and catchy startup names.",
    },
    {
        slug: "random-color-generator",
        name: "Random Color Generator",
        category: "generator",
        description: "Generate random colors with hex codes.",
        seoTitle: "Random Color Generator - HEX & RGB",
        seoDescription: "Generate random color palettes and hex codes.",
    },
    {
        slug: "lorem-ipsum-generator",
        name: "Lorem Ipsum Generator",
        category: "generator",
        description: "Generate placeholder text.",
        seoTitle: "Lorem Ipsum Generator - Dummy Text",
        seoDescription: "Generate standard Lorem Ipsum placeholder text.",
    },
    {
        slug: "dummy-json-generator",
        name: "Dummy JSON Generator",
        category: "generator",
        description: "Generate mock JSON data.",
        seoTitle: "Dummy JSON Generator - Mock Data",
        seoDescription: "Create JSON data for testing APIs and apps.",
    },
    {
        slug: "dummy-csv-generator",
        name: "Dummy CSV Generator",
        category: "generator",
        description: "Generate mock CSV data.",
        seoTitle: "Dummy CSV Generator - Spreadsheet Data",
        seoDescription: "Create CSV files with random test data.",
    },
    {
        slug: "test-data-generator",
        name: "Test Data Generator",
        category: "generator",
        description: "Generate custom test data rows.",
        seoTitle: "Test Data Generator - Custom Rows",
        seoDescription: "Generate customizable string templates for testing.",
    },
    // Developer Tools
    {
        slug: "json-formatter",
        name: "JSON Formatter",
        category: "developer",
        description: "Format, validate, and minify JSON data.",
        seoTitle: "Online JSON Formatter & Validator",
        seoDescription: "Beautifully format and validate your JSON data online.",
    },
    {
        slug: "base64-encode-decode",
        name: "Base64 Encode/Decode",
        category: "developer",
        description: "Encode text to Base64 or decode Base64 to text.",
        seoTitle: "Base64 Encoder & Decoder Online",
        seoDescription: "Convert text to Base64 and vice versa instantly.",
    },
    {
        slug: "url-encode-decode",
        name: "URL Encode/Decode",
        category: "developer",
        description: "Encode text to URL-safe format or decode it.",
        seoTitle: "URL Encoder & Decoder - Percent Encoding Tool",
        seoDescription: "Encode and decode URLs easily. Convert special characters to percent-encoded format.",
    },
    {
        slug: "html-escape-unescape",
        name: "HTML Escape/Unescape",
        category: "developer",
        description: "Escape or unescape HTML entities in text.",
        seoTitle: "HTML Escape & Unescape Tool",
        seoDescription: "Convert special characters to HTML entities and back.",
    },
    {
        slug: "timestamp-converter",
        name: "Timestamp Converter",
        category: "developer",
        description: "Convert Unix timestamps to human-readable dates and vice versa.",
        seoTitle: "Epoch Unix Timestamp Converter",
        seoDescription: "Convert Unix timestamps (seconds/milliseconds) to readable dates.",
    },
    {
        slug: "regex-tester",
        name: "Regex Tester",
        category: "developer",
        description: "Test regular expressions against text in real-time.",
        seoTitle: "Online Regex Tester & Debugger",
        seoDescription: "Test and debug your JavaScript regular expressions online.",
    },
    {
        slug: "color-converter",
        name: "Color Converter",
        category: "developer",
        description: "Convert colors between HEX, RGB, and HSL formats.",
        seoTitle: "Color Code Converter - HEX, RGB, HSL",
        seoDescription: "Convert color codes easily. HEX to RGB, RGB to HSL, and more.",
    },
    {
        slug: "jwt-decoder",
        name: "JWT Decoder",
        category: "developer",
        description: "Decode JSON Web Tokens (JWT) to view header and payload.",
        seoTitle: "Online JWT Decoder - View Token Claims",
        seoDescription: "Decode JWT tokens instantly without sending them to a server.",
    },
    {
        slug: "hash-generator",
        name: "Hash Generator",
        category: "developer",
        description: "Generate SHA-1, SHA-256 hashes from text.",
        seoTitle: "Online Hash Generator - SHA1, SHA256",
        seoDescription: "Generate secure hashes for your text strings using browser crypto.",
    },
    // Image Tools
    {
        slug: "jpg-to-png",
        name: "JPG to PNG",
        category: "image",
        description: "Convert JPG images to PNG format instantly.",
        seoTitle: "JPG to PNG Converter - Free Online Image Tool",
        seoDescription: "Convert JPEG/JPG images to PNG format with high quality.",
    },
    {
        slug: "png-to-jpg",
        name: "PNG to JPG",
        category: "image",
        description: "Convert PNG images to JPG format instantly.",
        seoTitle: "PNG to JPG Converter - Free Online Image Tool",
        seoDescription: "Convert PNG images to JPEG/JPG format with high quality.",
    },
    {
        slug: "webp-converter",
        name: "WebP Converter",
        category: "image",
        description: "Convert images to modern WebP format.",
        seoTitle: "WebP Image Converter - Optimize Images",
        seoDescription: "Convert JPG and PNG images to WebP format for better web performance.",
    },
    {
        slug: "image-resizer",
        name: "Image Resizer",
        category: "image",
        description: "Resize images to specific dimensions in pixels.",
        seoTitle: "Online Image Resizer - Resize JPG, PNG, WebP",
        seoDescription: "Resize your images quickly and easily. Set custom width and height.",
    },
    {
        slug: "image-compressor",
        name: "Image Compressor",
        category: "image",
        description: "Compress images to reduce file size without losing quality.",
        seoTitle: "Online Image Compressor - Reduce Image Size",
        seoDescription: "Compress JPG images online to save space and improve load times.",
    },
    {
        slug: "image-rotator",
        name: "Image Rotator",
        category: "image",
        description: "Rotate images 90 degrees or arbitrary angles.",
        seoTitle: "Online Image Rotator - Rotate Photos",
        seoDescription: "Rotate images clockwise or counter-clockwise instantly.",
    },
    {
        slug: "image-to-base64",
        name: "Image to Base64",
        category: "image",
        description: "Convert image files to Base64 encoded strings.",
        seoTitle: "Image to Base64 Converter - Encode Images",
        seoDescription: "Convert any image to Base64 string for embedding in HTML/CSS.",
    },
    {
        slug: "color-picker",
        name: "Color Picker from Image",
        category: "image",
        description: "Pick colors directly from your image to get HEX/RGB codes.",
        seoTitle: "Image Color Picker - Extract Colors from Photos",
        seoDescription: "Upload an image and click to pick any color. Get HEX, RGB, and HSL values.",
    },
    {
        slug: "favicon-generator",
        name: "Favicon Generator",
        category: "image",
        description: "Generate favicons (ICO/PNG) from your images.",
        seoTitle: "Favicon Generator - Create Website Icons",
        seoDescription: "Create favicons for your website. Generate 16x16, 32x32, and touch icons.",
    },
    // SEO Tools
    {
        slug: "meta-tag-generator",
        name: "Meta Tag Generator",
        category: "seo",
        description: "Generate SEO meta tags and social media meta tags (Open Graph, Twitter).",
        seoTitle: "Meta Tag Generator - SEO & Social Media Tags",
        seoDescription: "Generate correct title, description, keywords, Open Graph, and Twitter card meta tags.",
    },
    {
        slug: "robots-txt-generator",
        name: "Robots.txt Generator",
        category: "seo",
        description: "Create a robots.txt file to control search engine crawlers.",
        seoTitle: "Robots.txt Generator - Control Search Crawlers",
        seoDescription: "Generate robots.txt file for your website. Allow or disallow specific bots and paths.",
    },
    {
        slug: "sitemap-xml-generator",
        name: "Sitemap XML Generator",
        category: "seo",
        description: "Generate a simple XML sitemap from a list of URLs.",
        seoTitle: "XML Sitemap Generator - Create Google Sitemap",
        seoDescription: "Generate XML sitemap for your website. Help search engines index your pages.",
    },
    {
        slug: "keyword-density-checker",
        name: "Keyword Density Checker",
        category: "seo",
        description: "Analyze the keyword usage and density in your text.",
        seoTitle: "Keyword Density Checker - SEO Content Analysis",
        seoDescription: "Check keyword frequency and density in your content. Optimize for SEO.",
    },
    {
        slug: "schema-markup-generator",
        name: "Schema Markup Generator",
        category: "seo",
        description: "Generate JSON-LD structured data for your website content.",
        seoTitle: "Schema Markup Generator - JSON-LD Structured Data",
        seoDescription: "Create Schema.org structured data for Articles, Products, FAQs, and Local Business.",
    },
    {
        slug: "serp-preview",
        name: "SERP Snippet Preview",
        category: "seo",
        description: "Preview how your page will look in Google search results.",
        seoTitle: "SERP Simulator - Google Search Snippet Preview",
        seoDescription: "Visualize your website's search appearance on Google. Optimize title and description.",
    },
    {
        slug: "heading-structure-checker",
        name: "Heading Structure Checker",
        description: "Visualize and analyze the H1-H6 structure of your content.",
        category: "seo",
        seoTitle: "Heading Structure Checker - SEO Analysis",
        seoDescription: "Check usage of H1, H2, H3 tags. Ensure proper heading hierarchy for SEO.",
    },
    // Calculator Tools
    {
        slug: "age-calculator",
        name: "Age Calculator",
        category: "calculator",
        description: "Calculate your age in years, months, and days.",
        seoTitle: "Age Calculator - Calculate DOB to Current Date",
        seoDescription: "Calculate your exact age and find out how many days until your next birthday.",
    },
    {
        slug: "percentage-calculator",
        name: "Percentage Calculator",
        category: "calculator",
        description: "Calculate percentages, percentage change, and percentage differences.",
        seoTitle: "Percentage Calculator - Online Math Tool",
        seoDescription: "Easily calculate percentages. What is X% of Y? X is what % of Y?",
    },
    {
        slug: "bmi-calculator",
        name: "BMI Calculator",
        category: "calculator",
        description: "Calculate Body Mass Index (BMI) and check weight categories.",
        seoTitle: "BMI Calculator - Body Mass Index",
        seoDescription: "Calculate your BMI using metric or imperial units to check if you are a healthy weight.",
    },
    {
        slug: "loan-calculator",
        name: "Loan/EMI Calculator",
        category: "calculator",
        description: "Calculate monthly loan payments (EMI) and total interest.",
        seoTitle: "Loan EMI Calculator - Mortgage, Car, Personal Loan",
        seoDescription: "Calculate your monthly loan EMI payments and total interest payable.",
    },
    {
        slug: "discount-calculator",
        name: "Discount Calculator",
        category: "calculator",
        description: "Calculate final price after discount and amount saved.",
        seoTitle: "Discount Calculator - Sale Price & Savings",
        seoDescription: "Calculate the sale price and your savings after applying a discount percentage.",
    },
    {
        slug: "tip-calculator",
        name: "Tip Calculator",
        category: "calculator",
        description: "Calculate tip amount and total bill per person.",
        seoTitle: "Tip Calculator - Split Bill & Gratuity",
        seoDescription: "Calculate the tip amount and split the total bill evenly among friends.",
    },
    {
        slug: "date-calculator",
        name: "Date Difference Calculator",
        category: "calculator",
        description: "Calculate the difference between two dates in years, months, and days.",
        seoTitle: "Date Difference Calculator - Days Between Dates",
        seoDescription: "Calculate the number of days, months, and years between two dates.",
    },
    {
        slug: "time-calculator",
        name: "Time Duration Calculator",
        category: "calculator",
        description: "Calculate the duration between two times.",
        seoTitle: "Time Duration Calculator - Time Difference",
        seoDescription: "Calculate the hours and minutes between two specific times.",
    },
    {
        slug: "unit-converter",
        name: "Unit Converter",
        category: "calculator",
        description: "Convert between common units of length, weight, temperature, and area.",
        seoTitle: "Online Unit Converter - Length, Weight, Temp",
        seoDescription: "Convert units easily. Meters to feet, Kilograms to pounds, Celsius to Fahrenheit.",
    },
    {
        slug: "gpa-calculator",
        name: "GPA Calculator",
        category: "calculator",
        description: "Calculate your Grade Point Average (GPA) from course grades.",
        seoTitle: "College GPA Calculator - Calculate Your Grades",
        seoDescription: "Calculate your semester or cumulative GPA on a 4.0 scale.",
    },
    // Student Tools
    {
        slug: "citation-generator",
        name: "Citation Generator",
        category: "student",
        description: "Generate citations in APA, MLA, and Chicago styles.",
        seoTitle: "Citation Generator - APA, MLA, Chicago Style",
        seoDescription: "Create citations for your essays and papers. Supports APA, MLA, and Chicago formats.",
    },
    {
        slug: "pomodoro-timer",
        name: "Pomodoro Timer",
        category: "student",
        description: "Focus on study with a 25-minute Pomodoro timer.",
        seoTitle: "Pomodoro Timer Online - Study & Focus Tool",
        seoDescription: "Boost your productivity with a free online Pomodoro timer. 25 min work, 5 min break.",
    },
    {
        slug: "final-grade-calculator",
        name: "Final Grade Calculator",
        category: "student",
        description: "Calculate what you need on your final exam to get a target grade.",
        seoTitle: "Final Grade Calculator - What do I need to pass?",
        seoDescription: "Calculate the score you need on your final exam to achieve your desired course grade.",
    },
    {
        slug: "exam-countdown",
        name: "Exam Countdown",
        category: "student",
        description: "Count down the days, hours, and minutes until your exam.",
        seoTitle: "Exam Countdown Timer - Track Exam Dates",
        seoDescription: "Create a countdown for your upcoming exams. Never miss a deadline.",
    },
    {
        slug: "reading-time-estimator",
        name: "Reading Time Estimator",
        category: "student",
        description: "Estimate how long it will take to read a text.",
        seoTitle: "Reading Time Calculator - WPM Estimator",
        seoDescription: "Check how long it takes to read an article or essay based on word count and WPM.",
    },
    {
        slug: "text-to-speech",
        name: "Text to Speech",
        category: "student",
        description: "Convert text to spoken words using browser voices.",
        seoTitle: "Text to Speech Online - TTS Reader",
        seoDescription: "Listen to your text. Convert written content to speech with natural voices.",
    },
    {
        slug: "notes-formatter",
        name: "Notes Formatter",
        description: "Clean up and format messy study notes automatically.",
        category: "student",
        seoTitle: "Notes Formatter - Organize Your Study Notes",
        seoDescription: "Auto-format messy notes, fix spacing, and capitalize sentences.",
    },
    // Web Tools
    {
        slug: "qr-code-generator",
        name: "QR Code Generator",
        category: "web",
        description: "Generate QR codes for URLs, text, and contacts.",
        seoTitle: "Free QR Code Generator - PNG Download",
        seoDescription: "Create and download QR codes for free. Supports URLs, Text, and WiFi.",
    },
    {
        slug: "my-ip-address",
        name: "My IP Address",
        category: "web",
        description: "Find your public IP address and location.",
        seoTitle: "What Is My IP Address? - IP Location Finder",
        seoDescription: "Check your public IP address, ISP, and location instantly.",
    },
    {
        slug: "user-agent-viewer",
        name: "User Agent Viewer",
        category: "web",
        description: "View your browser's User Agent string.",
        seoTitle: "User Agent String Viewer - Browser Info",
        seoDescription: "View and copy your User Agent string. Check browser version and OS.",
    },
    {
        slug: "screen-resolution",
        name: "Screen Resolution Checker",
        category: "web",
        description: "Check your screen resolution and pixel density.",
        seoTitle: "What is my Screen Resolution? - Display Checker",
        seoDescription: "Check your current screen resolution, pixel ratio, and color depth.",
    },

    // Security Tools
    {
        slug: "password-generator",
        name: "Password Generator",
        category: "security",
        description: "Generate strong, secure passwords instantly.",
        seoTitle: "Strong Password Generator - Secure Random Passwords",
        seoDescription: "Create secure passwords with custom length and characters. Protect your accounts.",
    },
    {
        slug: "password-strength-checker",
        name: "Password Strength Checker",
        category: "security",
        description: "Test the strength of your password against common attacks.",
        seoTitle: "Password Strength Checker - Test Password Security",
        seoDescription: "Check how strong your password is. Get tips to improve password security.",
    },
    {
        slug: "rsa-key-generator",
        name: "RSA Key Generator",
        category: "security",
        description: "Generate public and private RSA key pairs.",
        seoTitle: "Online RSA Key Generator - Public & Private Keys",
        seoDescription: "Generate 2048-bit or 4096-bit RSA key pairs for encryption and signing.",
    },
    {
        slug: "uuid-generator",
        name: "UUID Generator",
        category: "security",
        description: "Generate random UUIDs (v4) for your projects.",
        seoTitle: "UUID Generator - Random v4 UUID",
        seoDescription: "Generate Version 4 UUIDs instantly. Ideal for database IDs and testing.",
    },
    // Social Media Tools
    {
        slug: "youtube-thumbnail-downloader",
        name: "YouTube Thumbnail",
        category: "social",
        description: "Download high-quality thumbnails from any YouTube video.",
        seoTitle: "YouTube Thumbnail Downloader - 4K, HD, SD",
        seoDescription: "Download YouTube thumbnails in various qualities (Max Res, HD, SD).",
    },
    {
        slug: "tweet-preview",
        name: "Tweet Preview",
        category: "social",
        description: "Mockup and preview tweets before posting.",
        seoTitle: "Tweet Preview & Mockup Tool",
        seoDescription: "Create fake tweet lookalikes or preview your tweets before publishing.",
    },
    {
        slug: "hashtag-generator",
        name: "Hashtag Generator",
        category: "social",
        description: "Generate relevant hashtags for your social media posts.",
        seoTitle: "Hashtag Generator - Instagram, Twitter, TikTok",
        seoDescription: "Generate popular and trending hashtags for your content based on keywords.",
    },
    {
        slug: "bio-link-builder",
        name: "Bio Link Builder",
        description: "Create a 'Link in Bio' page and export the code.",
        category: "social",
        seoTitle: "Free Bio Link Builder - Linktree Alternative",
        seoDescription: "Design a beautiful Link in Bio page for Instagram and TikTok. Export HTML for free.",
    },
    {
        slug: "character-limit-checker",
        name: "Social Character Checker",
        description: "Check text length against limits for Twitter, Instagram, LinkedIn.",
        category: "social",
        seoTitle: "Social Media Character Counter - Twitter, Instagram, LinkedIn",
        seoDescription: "Check if your post fits character limits for all major social platforms.",
    },
];

export const categories: { id: ToolCategory; name: string; description: string }[] = [
    { id: "text", name: "Text Tools", description: "Format, analyze, and manipulate text content." },
    { id: "text-advanced", name: "Text Processing", description: "Advanced string manipulation and metrics." },
    { id: "data", name: "File & Data", description: "Convert, view, and format file data (JSON, CSV, XML)." },
    { id: "math", name: "Math & Numbers", description: "Calculators for math, statistics, and number conversion." },
    { id: "design", name: "Color & Design", description: "Tools for designers: gradients, palettes, and CSS." },
    { id: "productivity", name: "Time & Productivity", description: "Timers, clocks, and productivity trackers." },
    { id: "format", name: "Encoding & Formatting", description: "Encoders, decoders, and code formatters." },
    { id: "language", name: "Language Tools", description: "Linguistic analysis and word games." },
    { id: "visualization", name: "Data Visualization", description: "Generate charts and graphs from data." },
    { id: "validation", name: "Validation Tools", description: "Validate emails, URLs, IP addresses, and more." },
    { id: "generator", name: "Generators", description: "Generate random data, names, and placeholders." },
    { id: "developer", name: "Developer Tools", description: "Utilities for coding, debugging, and data format." },
    { id: "image", name: "Image Tools", description: "Optimizing, resizing, and converting images." },
    { id: "seo", name: "SEO Tools", description: "Boost your search engine rankings." },
    { id: "calculator", name: "Calculators", description: "Compute numbers for finance, health, and more." },
    { id: "student", name: "Student Tools", description: "Helpers for academic tasks." },
    { id: "web", name: "Web Tools", description: "Analyze web pages and domains." },
    { id: "security", name: "Security Tools", description: "Protect your data and generate secure keys." },
    { id: "social", name: "Social Media", description: "Enhance your social media presence." },
];
