import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Calendar, Tag, Share2, Heart } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { getItemBySlug, getItems } from "@/lib/db";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getItemBySlug("blog", slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getItems("blog");
  const related = allPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);

  return (
    <article className="pt-28 md:pt-36 pb-20 bg-[#F6EFE3] dark:bg-[#1C1008] min-h-screen">
      {/* Header */}
      <div className="bg-[#3D2618] text-[#E8D6B8] py-16">
        <div className="container-custom max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#B68A4B] hover:text-[#C9A46A] mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para todos os artigos
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#B68A4B] text-white text-xs font-bold uppercase rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-[#C9A46A]/60 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {post.readTime} min de leitura
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between border-t border-[#5A3925] pt-6 text-xs text-[#E8D6B8]/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B68A4B] flex items-center justify-center font-bold text-white text-sm">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-white">{post.author}</div>
                <div className="text-[#B68A4B]">{post.authorRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#C9A46A]/60">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Article Body */}
      <div className="container-custom max-w-3xl py-12">
        <div className="bg-white dark:bg-[#2A1910] rounded-3xl p-8 md:p-12 border border-[#D4B896] dark:border-[#4A3020] shadow-lg mb-12">
          {/* Summary Lead */}
          <p className="text-lg font-display italic text-[#B68A4B] mb-8 pb-6 border-b border-[#F6EFE3] dark:border-[#3D2618]">
            &ldquo;{post.summary}&rdquo;
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none text-[#5A3925] dark:text-[#E8D6B8] leading-relaxed space-y-6">
            <p>{post.content}</p>
            <p>
              O Encontro de Jovens com Cristo continua a transformar e santificar a vida de tantos
              que se colocam à disposição do Senhor. A verdadeira conversão passa pela escuta atenta da Palavra de Deus e pela vivência fraterna na comunidade paroquial.
            </p>
            <blockquote className="p-4 border-l-4 border-[#B68A4B] bg-[#F6EFE3] dark:bg-[#1C1008] italic my-6 font-display text-xl">
              &ldquo;Não tenhais medo de responder com generosidade ao chamado do Senhor. Deixai que Ele transforme a vossa juventude em luz para o mundo.&rdquo;
            </blockquote>
            <p>
              Nossa Senhora do Carmo, Mãe e Padroeira do nosso movimento, continua a interceder por cada jovem que busca seu espaço e sua vocação na Igreja.
            </p>
          </div>

          {/* Tags & Share */}
          <div className="mt-12 pt-6 border-t border-[#F6EFE3] dark:border-[#3D2618] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-[#B68A4B]" />
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 bg-[#F6EFE3] dark:bg-[#1C1008] text-[#5A3925] dark:text-[#C9A46A] text-xs rounded-md"
                >
                  #{t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-[#9B7E5E]">
              <button className="flex items-center gap-1 hover:text-[#B68A4B] transition-colors">
                <Heart className="w-4 h-4" /> Gostei
              </button>
              <button className="flex items-center gap-1 hover:text-[#B68A4B] transition-colors">
                <Share2 className="w-4 h-4" /> Compartilhar
              </button>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <div>
            <h3 className="font-display font-bold text-2xl text-[#3D2618] dark:text-[#E8D6B8] mb-6">
              Artigos Relacionados
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`}>
                  <div className="bg-white dark:bg-[#2A1910] p-6 rounded-2xl border border-[#D4B896] dark:border-[#4A3020] hover:border-[#B68A4B] transition-all">
                    <span className="text-[10px] text-[#B68A4B] font-bold uppercase">{r.category}</span>
                    <h4 className="font-display font-bold text-lg text-[#3D2618] dark:text-[#E8D6B8] mt-1 mb-2">
                      {r.title}
                    </h4>
                    <p className="text-xs text-[#5A3925] dark:text-[#C9A46A]/80 line-clamp-2">
                      {r.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
