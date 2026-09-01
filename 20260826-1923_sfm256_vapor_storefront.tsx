/**
 * Zettelkasten ID: 20260826-1923
 * Project: sfm256-vapor
 * Role: Satirical digital store interface generating absurd invoices, fake review boards, and troll comment streams [cite: 365, 413]
 */

import React, { useState, useEffect, useRef } from 'react';
import { useStickySetting } from '../state/meowState';
import { pushMeowToast } from '../components/MeowToast';
import { MeowModal } from '../components/MeowModals';

interface VaporGame {
  id: string;
  title: string;
  tagline: string;
  basePrice: number;
  rating: string;
  category: string;
}

export const VaporStorefront: React.FC = () => {
  const [activeCart, setActiveCart] = useStickySetting<string[]>('sfm256_vapor_cart', []);
  const [purchasedApps, setPurchasedApps] = useStickySetting<string[]>('sfm256_vapor_purchased', []);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);

  const [trollComments, setTrollComments] = useState<Array<{ id: number; user: string; text: string; rating: number }>>([
    { id: 1, user: "murdock_the_wise", text: "This game literally gave my computer's CPU a panic attack. 10/10", rating: 5 },
    { id: 2, user: "kitty_claws", text: "Lagged so hard my actual physical bunk bed fell over.", rating: 1 },
    { id: 3, user: "giga_chad_99", text: "Still waiting for a real graphics update, ASCII is so last millennium.", rating: 2 },
    { id: 4, user: "anonymous_whiner", text: "Why are the cards crying? This game is emotionally abusive.", rating: 5 }
  ]);
  const [newComment, setNewComment] = useState('');

  const gameCatalog: VaporGame[] = [
    { id: 'psychic_solitaire', title: 'Psychic Solitaire 256', tagline: 'A card game that actively hates you and screams base64 whining sequences [cite: 365, 413].', basePrice: 599.99, rating: '★★★★★ (Psychic Approved)', category: 'games' },
    { id: 'amm256_raytracer', title: 'AMM-256 Raytracer Pro', tagline: 'Heavy ASCII render processing that turns your laptop fan into a direct jet engine [cite: 365, 413].', basePrice: 1299.99, rating: '★★★☆☆ (Loud Fan Mode)', category: 'tools' },
    { id: 'storycraft_unoe', title: 'Storyteller AI UNOE-10K Compiler', tagline: 'Unleash extreme multi-vector outline compilation at 616ms flat speeds [cite: 371, 419]!', basePrice: 89.99, rating: '★★★★★ (Vitest Verified)', category: 'story' },
    { id: 'somatic_excretion_pro', title: 'Somatic Excretion Pro Logger', tagline: 'Automatically tag your bathroom duration sequences. Banish manual logging thrashes [cite: 574, 738]!', basePrice: 0.00, rating: '★★★★☆ (Bio Logged)', category: 'tools' }
  ];

  const handleAddToCart = (id: string) => {
    if (activeCart.includes(id)) {
      pushMeowToast('Item already in your virtual cart!', 'info');
      return;
    }
    setActiveCart([...activeCart, id]);
    pushMeowToast('Added satirical item to cart.', 'success');
  };

  const handleCheckout = () => {
    if (activeCart.length === 0) return;

    const timestamp = new Date().toLocaleString();
    const invoiceId = Math.floor(100000 + Math.random() * 900000);
    
    // Generate satirical invoice receipt markdown [cite: 365]
    let invoice = `========================================\n`;
    invoice += `      🐾 VAPOR DIGITAL STOREFRONT 🐾     \n`;
    invoice += `========================================\n`;
    invoice += `INVOICE ID: #${invoiceId}\n`;
    invoice += `DATE: ${timestamp}\n`;
    invoice += `----------------------------------------\n`;
    
    let total = 0;
    activeCart.forEach((gameId) => {
      const g = gameCatalog.find((x) => x.id === gameId);
      if (g) {
        invoice += `${g.title}\n`;
        invoice += `  MSRP (Satirical): $${g.basePrice.toFixed(2)}\n`;
        total += g.basePrice;
      }
    });

    const tax = total * 0.15; // Melodramatic high-tax index
    const grandTotal = total + tax;

    invoice += `----------------------------------------\n`;
    invoice += `SUBTOTAL:         $${total.toFixed(2)}\n`;
    invoice += `TAX (Melodrama):  $${tax.toFixed(2)}\n`;
    invoice += `GRAND TOTAL:      $${grandTotal.toFixed(2)}\n`;
    invoice += `========================================\n`;
    invoice += `  Note: This is a satirical virtual transaction.\n`;
    invoice += `  Your physical credit card was not billed.\n`;
    invoice += `  You are now certified off-grid retro. [cite: 415]\n`;
    invoice += `========================================\n`;

    setReceipt(invoice);
    setPurchasedApps([...purchasedApps, ...activeCart]);
    setActiveCart([]);
    pushMeowToast('Checkout complete! Invoiced generated!', 'success');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: "gamer_kitty_" + Math.floor(Math.random() * 100),
      text: newComment,
      rating: Math.floor(Math.random() * 5) + 1
    };

    setTrollComments([comment, ...trollComments]);
    setNewComment('');
    pushMeowToast('Spam logged on community forum.', 'success');
  };

  const filteredCatalog = selectedCategory === 'all' 
    ? gameCatalog 
    : gameCatalog.filter(g => g.category === selectedCategory);

  return (
    <div className="p-4 border-4 border-slate-900 bg-[#FFFDF5] text-slate-900 font-mono text-xs max-w-4xl shadow-[6px_6px_0_0_#1e1e2e]">
      
      {/* Top Header Block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-slate-900 pb-3 mb-4">
        <div>
          <h1 className="text-xl font-black uppercase flex items-center gap-1.5">
            👾 VAPOR STOREFRONT & MSRP RECOIL
          </h1>
          <p className="text-[10px] text-slate-500 font-bold mt-1">
            Super FabiMeow 256's Legally Distinct Platform & Sarcastic Ledger App [cite: 365, 413].
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsFaqOpen(true)} className="px-3 py-1 bg-indigo-200 border-2 border-slate-900 font-black hover:bg-indigo-300">FAQ</button>
          <button onClick={() => setIsChangelogOpen(true)} className="px-3 py-1 bg-pink-200 border-2 border-slate-900 font-black hover:bg-pink-300">Log</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Main Catalog View */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Category Filter Pills */}
          <div className="flex gap-1.5 border-b-2 border-slate-900 pb-2">
            {['all', 'games', 'tools', 'story'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 border-2 border-slate-900 font-black uppercase text-[10px] ${
                  selectedCategory === cat ? 'bg-indigo-300' : 'bg-white hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Game List Grid */}
          <div className="space-y-3">
            {filteredCatalog.map((game) => (
              <div 
                key={game.id} 
                className="p-3 border-2 border-slate-900 bg-white shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-black text-sm uppercase">{game.title}</h3>
                    <span className="text-[9px] bg-slate-900 text-yellow-300 px-1 py-0.5 font-bold">{game.rating}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-sm text-indigo-900">
                      {game.basePrice === 0 ? 'FREE' : `$${game.basePrice.toFixed(2)}`}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] leading-relaxed text-slate-700 mb-3">{game.tagline}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(game.id)}
                    className="px-3 py-1 bg-emerald-200 border-2 border-slate-900 font-black text-[10px] hover:bg-emerald-300"
                  >
                    🛒 Add Satirical Item
                  </button>
                  {purchasedApps.includes(game.id) && (
                    <span className="px-2 py-1 bg-amber-100 border border-amber-400 text-amber-800 text-[10px] font-bold">
                      ✔ Library Authenticated
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Troll Community Reviews */}
          <div className="p-3 border-2 border-slate-900 bg-white shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
            <h3 className="font-black text-sm uppercase mb-3 border-b border-slate-900 pb-1">
              💬 Community Troll Forum Threads
            </h3>
            
            <form onSubmit={handleAddComment} className="flex gap-2 mb-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Rant or post complete nonsense here..."
                className="flex-1 p-2 border-2 border-slate-900 text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-rose-200 border-2 border-slate-900 font-black hover:bg-rose-300"
              >
                Spam Note
              </button>
            </form>

            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {trollComments.map((tc) => (
                <div key={tc.id} className="p-2 bg-[#FFFDF5] border border-slate-900 text-[10px]">
                  <div className="flex justify-between font-bold text-indigo-900 mb-1">
                    <span>@{tc.user}</span>
                    <span>{"★".repeat(tc.rating)}</span>
                  </div>
                  <p className="text-slate-700 leading-normal">{tc.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Cart & Satirical MSRP Checkout */}
        <div className="space-y-4">
          
          <div className="p-3 border-2 border-slate-900 bg-[#E6E6FA] shadow-[3px_3px_0_0_rgba(30,30,46,1)]">
            <h3 className="font-black text-xs uppercase mb-2 border-b-2 border-slate-900 pb-1">
              🛒 Satirical Basket
            </h3>
            {activeCart.length === 0 ? (
              <p className="text-[10px] text-slate-500 font-bold">Your virtual cart is completely empty. Put some imaginary games in here!</p>
            ) : (
              <div className="space-y-2">
                {activeCart.map((id) => {
                  const item = gameCatalog.find((x) => x.id === id);
                  return (
                    <div key={id} className="flex justify-between items-center text-[10px] bg-[#FFFDF5] p-2 border border-slate-900">
                      <span className="font-black truncate max-w-[120px]">{item?.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-black">${item?.basePrice.toFixed(2)}</span>
                        <button
                          onClick={() => {
                            setActiveCart(activeCart.filter((x) => x !== id));
                            pushMeowToast('Removed item.', 'info');
                          }}
                          className="text-rose-600 hover:font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })}
                <button
                  onClick={handleCheckout}
                  className="w-full mt-2 py-2 bg-emerald-200 border-2 border-slate-900 font-black text-xs hover:bg-emerald-300"
                >
                  💳 Trigger Satirical Checkout
                </button>
              </div>
            )}
          </div>

          {/* Interactive ASCII Invoice Receipt Panel */}
          {receipt && (
            <div className="p-3 border-2 border-slate-900 bg-white shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
              <h3 className="font-black text-xs uppercase mb-2">📄 MSRP Invoiced Receipt</h3>
              <pre className="text-[9px] bg-slate-50 p-2 border border-slate-900 overflow-x-auto select-all max-h-[220px]">
                {receipt}
              </pre>
              <button
                onClick={() => setReceipt(null)}
                className="w-full mt-2 py-1 bg-slate-200 border border-slate-900 text-[10px] font-black hover:bg-slate-300"
              >
                Clear Screen
              </button>
            </div>
          )}

        </div>

      </div>

      {/* FAQ Modal */}
      {isFaqOpen && (
        <MeowModal isOpen={isFaqOpen} onClose={() => setIsFaqOpen(false)} title="FAQ: Vapor Storefront">
          <div className="space-y-3 font-mono text-xs">
            <p><strong>Q: What is the purpose of this storefront?</strong><br/>A: It acts as the legally distinct app distribution simulation for your <strong>sfm256</strong> (Super FabiMeow 256) ecosystem [cite: 365, 413]. You can "purchase" cartridges, view absurd high-stakes invoices, and read satirical feedback threads [cite: 365].</p>
            <p><strong>Q: Will my card be charged?</strong><br/>A: Absolutely not. This is a local-first, serverless game portal wrapper designed strictly for creative immersion and cartridge mapping [cite: 415, 1027].</p>
          </div>
        </MeowModal>
      )}

      {/* Changelog Modal */}
      {isChangelogOpen && (
        <MeowModal isOpen={isChangelogOpen} onClose={() => setIsChangelogOpen(false)} title="Changelog: Vapor Storefront">
          <div className="space-y-2 font-mono text-xs">
            <p><strong>v1.0.0 (2026-08-26):</strong></p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Created <code>VaporStorefront.tsx</code> following high-density Kawaii Brutalist styling presets [cite: 107, 300].</li>
              <li>Integrated satirical invoice generators and pre-populated game logs [cite: 365].</li>
              <li>Added persistent cart and library bindings utilizing <code>useStickySetting</code> hooks [cite: 324, 615].</li>
              <li>Scaffolded live feedback troll forums with automated spam comment triggers [cite: 365, 413].</li>
            </ul>
          </div>
        </MeowModal>
      )}

    </div>
  );
};
