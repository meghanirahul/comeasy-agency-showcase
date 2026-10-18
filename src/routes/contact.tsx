import {createFileRoute} from '@tanstack/react-router';
import {useState} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {PageHeading,metadata} from '@/components/agency';
import {contact} from '@/data/projects';
import {Button} from '@/components/ui/button';

export const Route=createFileRoute('/contact')({head:()=>metadata('Start your Shopify project','Talk to Comeasy about your Shopify store, custom app, integration, migration or growth project.'),component:Contact});

type Status='idle'|'sending'|'sent'|'error';

function Contact(){
  const [status,setStatus]=useState<Status>('idle');
  async function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const form=e.currentTarget;
    const data=new FormData(form);
    setStatus('sending');
    try{
      const res=await fetch('https://formsubmit.co/ajax/eeecc2e150d6c41e6249660ce5fbb171',{
        method:'POST',
        headers:{'Content-Type':'application/json',Accept:'application/json'},
        body:JSON.stringify({
          name:data.get('name'),
          email:data.get('email'),
          store:data.get('store')||'—',
          service:data.get('service'),
          message:data.get('message'),
          _subject:`Comeasy project enquiry: ${data.get('service')}`,
          _replyto:data.get('email'),
          _template:'table',
          _captcha:'false',
          _honey:data.get('_honey')||'',
        }),
      });
      const json=await res.json().catch(()=>({}));
      if(!res.ok||json.success===false||json.success==='false') throw new Error(json.message||'Failed');
      form.reset();
      setStatus('sent');
    }catch{
      setStatus('error');
    }
  }
  return <main>
    <PageHeading label="Let’s talk" title="What’s your next big idea?" description="A store to build. A problem to solve. A business to grow. Tell us what you have in mind."/>
    <div className="container contact-grid">
      <div className="contact-details">
        <div><h3>Email</h3><a href={`mailto:${contact.email}`}>{contact.email} <ArrowUpRight className="inline size-4"/></a></div>
        <div><h3>Call or WhatsApp</h3><a href={`https://wa.me/${contact.telephone.replace('+','')}`} target="_blank" rel="noreferrer">+91 94082 87186 <ArrowUpRight className="inline size-4"/></a></div>
        <div><h3>Based in</h3><p>Surat, Gujarat, India<br/><span className="text-muted-foreground text-sm">Working with brands worldwide.</span></p></div>
        <Button asChild variant="outline"><a className="booking-link" href="https://calendly.com/d/d3hn-w48-9bz" target="_blank" rel="noreferrer">Book a conversation <ArrowUpRight/></a></Button>
      </div>
      <form className="contact-form" onSubmit={onSubmit}>
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{display:'none'}}/>
        <div className="field-row">
          <label className="form-field">Your name<input name="name" autoComplete="name" placeholder="Alex Smith" required/></label>
          <label className="form-field">Email address<input name="email" type="email" autoComplete="email" placeholder="alex@yourbrand.com" required/></label>
        </div>
        <label className="form-field">Store or website (optional)<input name="store" placeholder="https://yourbrand.com"/></label>
        <label className="form-field">What can we help with?<select name="service"><option>Shopify development</option><option>Conversion & growth</option><option>Custom app or solution</option><option>API or app integration</option><option>Platform migration</option><option>SEO & performance</option><option>Consultation</option><option>AI agents</option><option>Something else</option></select></label>
        <label className="form-field">Tell us about your project<textarea name="message" required placeholder="Your goals, challenges and what you’d like to build…"/></label>
        <div><Button variant="ink" size="lg" type="submit" disabled={status==='sending'}>{status==='sending'?'Sending…':'Send enquiry'} <ArrowUpRight/></Button></div>
        <p className={`form-note ${status==='sent'?'form-success':status==='error'?'form-error':''}`} role="status">
          {status==='sent'?'Thank you! Your enquiry has been sent successfully.'
          :status==='error'?'Sorry, your enquiry could not be sent. Please try again or email us directly.'
          :'Your details are sent straight to our team.'}
        </p>
      </form>
    </div>
  </main>;
}
