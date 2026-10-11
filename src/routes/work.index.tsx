import {createFileRoute} from '@tanstack/react-router';
import {useState} from 'react';
import {PageHeading,ProjectCard,CTA,metadata} from '@/components/agency';
import {projects} from '@/data/projects';
import {Button} from '@/components/ui/button';
export const Route=createFileRoute('/work/')({head:()=>metadata('Our Shopify projects','Explore Comeasy’s Shopify storefronts, public apps, B2B implementations, integrations and large-scale customer and order migrations.'),component:Work});
function Work(){const [filter,setFilter]=useState('All projects');return <main><PageHeading label="Our work" title="Built to solve. Designed to grow." description="Storefront engineering, purpose-built apps and complex migrations. Explore the challenges we have turned into working Shopify solutions."/><div className="container pb-20"><div className="filter-bar" aria-label="Filter projects">{['All projects','Development','Apps','Integrations','Migration'].map(t=><Button key={t} variant={filter===t?'ink':'outline'} onClick={()=>setFilter(t)} aria-pressed={filter===t}>{t}</Button>)}</div><div className="project-grid">{projects.filter(p=>filter==='All projects'||p.category===filter).map(p=><ProjectCard key={p.slug} project={p}/>)}</div></div><CTA/></main>}
