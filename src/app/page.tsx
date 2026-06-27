import ContactForm from './components/ContactForm';

export default function Home() {
    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 p-4">
            <ContactForm />
        </main>
    );
}