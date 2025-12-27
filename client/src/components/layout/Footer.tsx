import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="font-bold text-2xl text-primary flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center font-serif italic">L</span>
              Lumiere
            </div>
            <p className="text-sm text-muted-foreground">
              {t("hero_subtitle")}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t("categories")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t("electronics")}</li>
              <li>{t("fashion")}</li>
              <li>{t("home")}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>FAQ</li>
              <li>Shipping</li>
              <li>Returns</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2024 Lumiere Market. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
