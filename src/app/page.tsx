import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Code, Palette, ShieldCheck, Rocket, Zap, Settings, MessageSquare, Send, Mail, DollarSign } from 'lucide-react';
import StatsDashboard from '@/components/common/StatsDashboard';

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const SolanaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="24" height="24" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_99_304)">
        <path fillRule="evenodd" clipRule="evenodd" d="M346.882 128H223.731C184.272 128 152.193 159.279 152.193 198.737V314.509C152.193 353.968 184.272 385.247 223.731 385.247H346.882C386.34 385.247 418.42 353.968 418.42 314.509V198.737C418.42 159.279 386.34 128 346.882 128ZM223.731 0C100.177 0 0 100.177 0 223.731V339.503C0 463.057 100.177 563.234 223.731 563.234H346.882C470.436 563.234 570.613 463.057 570.613 339.503V223.731C570.613 100.177 470.436 0 346.882 0H223.731Z" transform="translate(453.387 638.753)" fill="#00FFA3"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M346.882 128H223.731C184.272 128 152.193 159.279 152.193 198.737V314.509C152.193 353.968 184.272 385.247 223.731 385.247H346.882C386.34 385.247 418.42 353.968 418.42 314.509V198.737C418.42 159.279 386.34 128 346.882 128ZM223.731 0C100.177 0 0 100.177 0 223.731V339.503C0 463.057 100.177 563.234 223.731 563.234H346.882C470.436 563.234 570.613 463.057 570.613 339.503V223.731C570.613 100.177 470.436 0 346.882 0H223.731Z" transform="translate(0 385.247)" fill="#00FFA3"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M346.882 128H223.731C184.272 128 152.193 159.279 152.193 198.737V314.509C152.193 353.968 184.272 385.247 223.731 385.247H346.882C386.34 385.247 418.42 353.968 418.42 314.509V198.737C418.42 159.279 386.34 128 346.882 128ZM223.731 0C100.177 0 0 100.177 0 223.731V339.503C0 463.057 100.177 563.234 223.731 563.234H346.882C470.436 563.234 570.613 463.057 570.613 339.503V223.731C570.613 100.177 470.436 0 346.882 0H223.731Z" transform="translate(226.694)" fill="#8C44FF"/>
        </g>
        <defs>
        <clipPath id="clip0_99_304">
        <rect width="1024" height="1024" fill="white"/>
        </clipPath>
        </defs>
    </svg>
)

const UsdcIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#2775CA"/>
    <path d="M12.4497 5.25C9.49968 5.25 7.12468 6.75 6.42468 9.325L7.99968 9.95C8.42468 7.975 10.15 6.825 12.4247 6.825C14.5247 6.825 16.1 7.9 16.1 9.625C16.1 11.225 15.0247 12.05 13.2997 12.55L11.8747 12.925C10.2247 13.375 9.17468 14.35 9.17468 15.9C9.17468 17.5 10.3747 18.75 12.2497 18.75C14.3747 18.75 16.0247 17.3 16.6497 15.025L15.0247 14.35C14.6497 15.95 13.5247 17.15 12.2247 17.15C10.7247 17.15 9.87468 16.5 9.87468 15.55C9.87468 14.125 10.8247 13.4 12.3997 12.95L13.4497 12.65C15.5497 12.1 16.7997 10.925 16.7997 9.25C16.7997 6.9 14.9247 5.25 12.4497 5.25Z" fill="white"/>
    </svg>
)

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-glow sm:text-6xl font-headline">
              CREATE SOLANA STAKING PROTOCOL FOR FEE
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              With our Staking Builder you will be able to create your Custom Staking Site of your Token in Solana within 5 minutes and 0 coding.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg" className="button-glow px-10 py-6 text-lg">
                <Link href="/create">
                  Create now
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Dashboard */}
        <section className="py-12">
          <div className="container mx-auto px-4">
             <StatsDashboard />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-glow sm:text-4xl font-headline">Pricing</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Test the Staking Builder before paying anything. No credit card required, no hassles.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 lg:max-w-4xl lg:grid-cols-2">
              <Card className="bg-secondary/30 backdrop-blur-sm card-glow relative">
                <CardHeader>
                  <CardTitle>Basic</CardTitle>
                  <CardDescription>The fee per stake is paid by the user doing staking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-x-2">
                    <span className="text-4xl font-bold tracking-tight text-glow">FREE</span>
                  </div>
                  <p className="text-sm text-muted-foreground">& 0.008 SOL per stake</p>
                  <ul role="list" className="space-y-3 text-sm leading-6 text-muted-foreground">
                    <li className="flex gap-x-3"><CheckIcon className="h-6 w-6 flex-none text-accent" />Set up your own staking</li>
                    <li className="flex gap-x-3"><CheckIcon className="h-6 w-6 flex-none text-accent" />Don't pay anything</li>
                    <li className="flex gap-x-3"><CheckIcon className="h-6 w-6 flex-none text-accent" />Only colors customization</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-secondary/50 backdrop-blur-sm card-glow border-2 border-primary relative">
                <div className="absolute top-0 right-4 -mt-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-primary text-primary-foreground">Popular</span>
                </div>
                <CardHeader>
                  <CardTitle>Premium</CardTitle>
                  <CardDescription>The fee per stake is paid by the user doing staking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className='flex items-center gap-2'>
                    <span className="text-4xl font-bold tracking-tight text-glow">399$</span>
                    <div className="flex items-center -space-x-2">
                        <SolanaIcon className="h-6 w-6" />
                        <UsdcIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">& 0.002 SOL per stake</p>
                  <ul role="list" className="space-y-3 text-sm leading-6 text-muted-foreground">
                    <li className="flex gap-x-3"><CheckIcon className="h-6 w-6 flex-none text-primary" />Everything in Basic Plan, plus:</li>
                    <li className="flex gap-x-3"><CheckIcon className="h-6 w-6 flex-none text-primary" />Full Customization</li>
                    <li className="flex gap-x-3"><CheckIcon className="h-6 w-6 flex-none text-primary" />Up to 3 pools</li>
                    <li className="flex gap-x-3"><CheckIcon className="h-6 w-6 flex-none text-primary" />Put your extra Fee</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-glow sm:text-4xl font-headline">CREATE TOKEN STAKING WITHOUT CODING ON SOLANA</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We offer you the complexity of a Smart Contract with the simplicity of Shopify or Wix.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-glow">You provide the design, the code is already done</h3>
                <p className="mt-4 text-muted-foreground">
                  Forget about hiring an expensive developer for creating your Smart Contract. Bring your logo and your project, you will get your Staking Site working while you take a coffee.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-glow">Take the control, faster and cheaper</h3>
                <p className="mt-4 text-muted-foreground">
                  Thanks to our White label Builder we can offer a token staking faster and at a lower price than any developer, also providing you the control over it. You will deploy the contract with your wallet (without coding), so you will have the authority.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Staking Features Section */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-glow sm:text-4xl font-headline">Staking Features</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                We offer you the complexity of a Smart Contract with the simplicity of Shopify or Wix.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Settings className="h-8 w-8 text-accent"/>, title: "On Chain Set Up", description: "Set the Conditions for your Staking: Token Rewards, Staking Time, etc." },
                { icon: <Palette className="h-8 w-8 text-accent"/>, title: "Branded Staking", description: "Brand your Staking with custom logo, illustrations and Colors." },
                { icon: <Code className="h-8 w-8 text-accent"/>, title: "Own your Staking", description: "As you deploy the Smart Contract, you are the owner of the Staking." },
                { icon: <Rocket className="h-8 w-8 text-accent"/>, title: "Deployment", description: "Deploy the Staking by yourself with the customization previously made." },
                { icon: <Zap className="h-8 w-8 text-accent"/>, title: "Custom Pools", description: "Create custom pools with different lock times and rewards." },
                { icon: <ShieldCheck className="h-8 w-8 text-accent"/>, title: "Security", description: "Our dApp is Audited and used by thousands of users. Its 100% Safe." },
              ].map(feature => (
                <Card key={feature.title} className="bg-secondary/30 backdrop-blur-sm card-glow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      {feature.icon}
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-glow sm:text-4xl font-headline">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="w-full mt-12">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg">How does the Test Before Paying Work?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  It is like a “Free Trial” which allows you to make all the customization and preview how your Staking would work. You don’t need to connect your wallet or add any payment information. To make it public and let your holders use the Staking you should select a plan and deploy (paying if applicable).
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg">What is Solana Staking Builder?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Solana Staking Builder is a no-code tool that allows you to create a custom staking website and smart contract for your Solana-based token in minutes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg">Is it Safe to Create my Staking here?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, it's 100% safe. Our smart contracts are audited and secure. You deploy the contract with your own wallet, meaning you and only you have ownership and authority over it.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg">How much time will Create my Staking Take?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  You can have your staking site customized and deployed in as little as 5 minutes.
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg">Which Payment Methods are supported?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We support payments in major Solana tokens like SOL, USDC, and USDT for the premium plan. Staking fees are paid in SOL.
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg">Do I need to host the Staking Site?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  No, we handle the hosting for you. Your staking page will be available at a custom URL on our platform.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4">
             <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-glow sm:text-4xl font-headline">I have more questions</h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  How can we help you? Our team is here to chat with you and answer your questions.
                </p>
              </div>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <Card className="bg-secondary/30 backdrop-blur-sm card-glow">
                  <CardHeader>
                    <MessageSquare className="h-10 w-10 text-accent mx-auto"/>
                    <CardTitle>Chat with us</CardTitle>
                    <CardDescription>Start a conversation in a live chat with our team.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button>Start a Conversation</Button>
                  </CardContent>
                </Card>
                 <Card className="bg-secondary/30 backdrop-blur-sm card-glow">
                  <CardHeader>
                    <Send className="h-10 w-10 text-accent mx-auto"/>
                    <CardTitle>Message on Telegram</CardTitle>
                    <CardDescription>Our team will be happy to assist you on Telegram.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button>Send Message</Button>
                  </CardContent>
                </Card>
                 <Card className="bg-secondary/30 backdrop-blur-sm card-glow">
                  <CardHeader>
                    <Mail className="h-10 w-10 text-accent mx-auto"/>
                    <CardTitle>Email us</CardTitle>
                    <CardDescription>Send us an email and receive an answer within 24 hours.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline">info@stakingforge.io</Button>
                  </CardContent>
                </Card>
              </div>
          </div>
        </section>
      </main>
    </div>
  );
}
