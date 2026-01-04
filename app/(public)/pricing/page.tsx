import Link from "next/link";
import {
  Check,
  Sparkles,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Clock,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { getLocale } from "@/lib/get-locale";
import { getContent, getRawContent } from "@/lib/content";
import { getDirection } from "@/lib/i18n-config";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

export default async function PricingPage() {
  const locale = await getLocale();
  const dir = getDirection(locale);

  // Get pricing content
  const payPerResumeFeatures = (getRawContent(
    "pricing.payPerResume.features",
    locale
  ) || []) as string[];
  const subscriptionFeatures = (getRawContent(
    "pricing.subscription.features",
    locale
  ) || []) as string[];
  const faqQuestions = (getRawContent("pricing.faq.questions", locale) ||
    []) as FAQItem[];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/10 dark:from-blue-950/10 dark:via-purple-950/5 dark:to-pink-950/5"
      dir={dir}
    >
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-300/10 to-pink-300/10 rounded-full blur-3xl" />
        </div>

        <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-4 py-2 rounded-full border border-blue-200/50 dark:border-blue-800/50 mb-4">
            <Sparkles className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-300">
              {locale === "ar"
                ? "أسعار شفافة بدون رسوم خفية"
                : "Transparent Pricing - No Hidden Fees"}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            {getContent("pricing.header.title", locale)}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {getContent("pricing.header.subtitle", locale)}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto relative z-10">
          {/* Pay Per Resume Card */}
          <Card className="relative overflow-hidden border-2 hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 animate-in fade-in slide-in-from-left duration-700 delay-200 bg-background/80 backdrop-blur-sm flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400" />
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center shadow-md shadow-blue-400/20 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl">
                {getContent("pricing.payPerResume.name", locale)}
              </CardTitle>
              <CardDescription className="text-base">
                {getContent("pricing.payPerResume.description", locale)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 flex-1">
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    {getContent("pricing.payPerResume.price", locale)}
                  </span>
                  <span className="text-2xl font-semibold text-muted-foreground">
                    {getContent("pricing.payPerResume.currency", locale)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  {getContent("pricing.payPerResume.perResume", locale)}
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent" />

              <ul className="space-y-3">
                {payPerResumeFeatures.map((feature: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 animate-in fade-in slide-in-from-left duration-500"
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-6">
              <Button
                className="w-full group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                size="lg"
                asChild
              >
                <Link
                  href="/api/auth/signin?callbackUrl=/dashboard"
                  className="flex items-center justify-center gap-2"
                >
                  {getContent("pricing.payPerResume.buttonText", locale)}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Subscription Card */}
          <Card className="relative overflow-hidden border-2 border-purple-400/60 hover:border-purple-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 animate-in fade-in slide-in-from-right duration-700 delay-300 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 backdrop-blur-sm flex flex-col">
            {/* Popular Badge */}
            <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-6 py-2 text-sm font-semibold rounded-bl-xl flex items-center gap-1.5 shadow-md">
              <Star className="h-4 w-4 fill-white" />
              {getContent("pricing.subscription.badge", locale)}
            </div>

            <CardHeader className="pt-12 pb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white flex items-center justify-center shadow-md shadow-purple-400/20 mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl">
                {getContent("pricing.subscription.name", locale)}
              </CardTitle>
              <CardDescription className="text-base">
                {getContent("pricing.subscription.description", locale)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 flex-1">
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400">
                    {getContent("pricing.subscription.price", locale)}
                  </span>
                  <span className="text-2xl font-semibold text-muted-foreground">
                    {getContent("pricing.subscription.currency", locale)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  {getContent("pricing.subscription.perMonth", locale)}
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

              <ul className="space-y-3">
                {subscriptionFeatures.map((feature: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 animate-in fade-in slide-in-from-right duration-500"
                    style={{ animationDelay: `${400 + index * 100}ms` }}
                  >
                    <CheckCircle2 className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-6">
              <Button
                className="w-full group bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 shadow-md shadow-purple-400/20"
                size="lg"
                asChild
              >
                <Link
                  href="/api/auth/signin?callbackUrl=/dashboard"
                  className="flex items-center justify-center gap-2"
                >
                  {getContent("pricing.subscription.buttonText", locale)}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Benefits/Features Section */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              {locale === "ar"
                ? "لماذا تختار منصتنا؟"
                : "Why Choose Our Platform?"}
            </h2>
            <p className="text-muted-foreground text-lg">
              {locale === "ar"
                ? "ميزات مصممة لتسهيل عملية التوظيف"
                : "Features designed to make hiring easier"}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom duration-700 delay-600">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 text-white flex items-center justify-center shadow-md shadow-blue-400/20 mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">
                  {locale === "ar" ? "آمن وموثوق" : "Secure & Reliable"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {locale === "ar"
                    ? "جميع بيانات المرشحين محمية بتشفير من الدرجة الأولى. خصوصيتك وأمانك أولويتنا الأولى."
                    : "All candidate data is protected with enterprise-grade encryption. Your privacy and security are our top priority."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom duration-700 delay-700">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 text-white flex items-center justify-center shadow-md shadow-purple-400/20 mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">
                  {locale === "ar" ? "مرشحون معتمدون" : "Verified Candidates"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {locale === "ar"
                    ? "كل مرشح تم التحقق من ملفه الشخصي. احصل على وصول إلى مرشحين حقيقيين ومؤهلين فقط."
                    : "Every candidate profile is verified. Get access to only genuine, qualified candidates."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-400/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom duration-700 delay-800">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 text-white flex items-center justify-center shadow-md shadow-green-400/20 mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl">
                  {locale === "ar" ? "وفر الوقت" : "Save Time"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {locale === "ar"
                    ? "استخدم فلاتر البحث المتقدمة للعثور على المرشحين المثاليين في دقائق، وليس أيام."
                    : "Use advanced search filters to find perfect candidates in minutes, not days."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-900">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
                500+
              </div>
              <p className="text-muted-foreground font-medium">
                {locale === "ar" ? "مرشح نشط" : "Active Candidates"}
              </p>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-1000">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-2">
                150+
              </div>
              <p className="text-muted-foreground font-medium">
                {locale === "ar" ? "شركة موظفة" : "Hiring Companies"}
              </p>
            </div>
            <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-1100">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400 mb-2">
                95%
              </div>
              <p className="text-muted-foreground font-medium">
                {locale === "ar" ? "معدل الرضا" : "Satisfaction Rate"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm py-16 md:py-24 border-t">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              {getContent("pricing.faq.title", locale)}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqQuestions.map((item: FAQItem, index: number) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:border-purple-400/40 border-2 animate-in fade-in slide-in-from-bottom duration-500 bg-background/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">
                        {index + 1}
                      </span>
                    </div>
                    {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className={dir === "rtl" ? "pr-14" : "pl-14"}>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto relative">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5 rounded-3xl blur-3xl" />

          <Card className="relative border-2 border-purple-400/40 shadow-xl shadow-purple-400/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />
            <CardContent className="relative p-12 text-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full border border-purple-200/50 dark:border-purple-800/50 mb-4">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-300">
                  {locale === "ar"
                    ? "ابدأ التوظيف اليوم"
                    : "Start Hiring Today"}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                {locale === "ar"
                  ? "جاهز للعثور على أفضل المواهب؟"
                  : "Ready to Find Top Talent?"}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {locale === "ar"
                  ? "انضم إلى مئات المديرين الذين يجدون أفضل المواهب باستخدام منصتنا"
                  : "Join hundreds of recruiters finding top talent with our platform"}
              </p>
              <div className="flex gap-4 justify-center flex-wrap pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-md shadow-purple-400/20 group"
                  asChild
                >
                  <Link
                    href="/api/auth/signin?callbackUrl=/dashboard"
                    className="flex items-center gap-2"
                  >
                    {locale === "ar" ? "ابدأ الآن مجاناً" : "Get Started Free"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 hover:border-purple-400"
                  asChild
                >
                  <Link href="/">
                    {locale === "ar" ? "تصفح المرشحين" : "Browse Candidates"}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
