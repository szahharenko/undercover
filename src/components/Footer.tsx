import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="bg-charcoal text-cream p-20"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Section 2: Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
            <p>123 Cozy Lane, Comfort City, CC 45678</p>
            <p>Email: info@undercover.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>

          {/* Section 3: Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex justify-center space-x-6">
              <a href="#" className="hover:text-sage-green transition-colors" aria-label="Facebook">
                <Facebook size={28} />
              </a>
              <a href="#" className="hover:text-sage-green transition-colors" aria-label="Instagram">
                <Instagram size={28} />
              </a>
              <a href="#" className="hover:text-sage-green transition-colors" aria-label="Twitter">
                <Twitter size={28} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/20 pt-8 text-sm">
          &copy; {new Date().getFullYear()} Undercover Vibe. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
