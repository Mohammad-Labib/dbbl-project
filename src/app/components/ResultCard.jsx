export default function ResultCard({ result }) {
  return (
    <article className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 font-semibold rounded-md">
          {result.category}
        </span>
        <div className="flex items-center gap-1 text-amber-500 font-medium">
          ★ <span>{result.rating}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-900 hover:text-indigo-600 cursor-pointer mb-2">
        {result.title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed mb-4">{result.description}</p>
      <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
        <span>By <strong className="text-slate-700">{result.author}</strong></span>
        <span>Updated {result.date}</span>
      </div>
    </article>
  );
}