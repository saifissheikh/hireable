import Link from "next/link";
import { Briefcase } from "lucide-react";
import { getContent } from "@/lib/content";
import { getLocale } from "@/lib/get-locale";

export async function Footer() {
  const locale = await getLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link className="flex items-center gap-2" href="/">
              <Briefcase className="h-6 w-6" />
              <span className="font-bold text-lg">
                {getContent("app.name", locale)}
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {getContent("app.tagline", locale)}
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">
              {getContent("footer.product.title", locale)}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#features"
                  className="hover:text-foreground transition-colors"
                >
                  {getContent("footer.product.features", locale)}
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="hover:text-foreground transition-colors"
                >
                  {getContent("footer.product.pricing", locale)}
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="hover:text-foreground transition-colors"
                >
                  {getContent("footer.product.testimonials", locale)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">
              {getContent("footer.company.title", locale)}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#about"
                  className="hover:text-foreground transition-colors"
                >
                  {getContent("footer.company.about", locale)}
                </Link>
              </li>
              <li>
                <Link
                  href="#careers"
                  className="hover:text-foreground transition-colors"
                >
                  {getContent("footer.company.careers", locale)}
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-foreground transition-colors"
                >
                  {getContent("footer.company.contact", locale)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">
              {getContent("footer.legal.title", locale)}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#privacy"
                  className="hover:text-foreground transition-colors"
                >
                  {getContent("footer.legal.privacy", locale)}
                </Link>
              </li>
              <li>
                <Link
                  href="#terms"
                  className="hover:text-foreground transition-colors"
                >
                  {getContent("footer.legal.terms", locale)}
                </Link>
              </li>
              <li>
                <Link
                  href="#cookies"
                  className="hover:text-foreground transition-colors"
                >
                  {getContent("footer.legal.cookies", locale)}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} {getContent("app.name", locale)}.{" "}
            {getContent("footer.copyright", locale)}
          </p>
        </div>
      </div>
    </footer>
  );
}
