"use client";

import Contact from "@/app/contact/contact.json";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import NotificatioPopUp from "@/components/notification-popup-modal";
import Email from "@/components/sendemail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import emailjs from "@emailjs/browser";
import Avatar from '@mui/material/Avatar';
import * as React from "react";
import { useEffect, useState } from "react";
import { MdEmail, MdOutlinePhoneIphone } from "react-icons/md";

export interface AboutContact {
	contact: ContactInfo[]
	platforms: Platforms
}

export interface ContactInfo {
	role: string
	name: string
	links: Link[]
	phone: string
	email: string
}

export interface Link {
	platform: TPlatform
	link: string
}

export interface Platforms {
	instagram: string
	linkedin: string
	x: string
	email: string
	threads: string
	facebook: string
}
type TPlatform = keyof Platforms;

export default function Page() {
	const [appContactData, setAppContactData] = useState<ContactInfo[]>([]);
	const [appContactPlatformsData, setAppContactPlatformsData] = useState<Partial<Platforms>>({});
	const [appContactDataFetched, setAppContactDataFetched] = useState(false);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState({});
	const [requestInProcess, setRequestInProcess] = useState(false);

	let contact: any = {};
	let platforms: any = {};

	const getContent = async () => {
		try {
			contact = Contact;
			platforms = Contact.platforms;
			return contact;
		} catch (error) {
			console.error('Error in Contact getContent:', error);
			throw error;
		}
	};

	const fetchData = async () => {
		if (appContactData.length === 0 && !appContactDataFetched) {
			const oData: any = await getContent();
			oData?.contact && setAppContactData(oData.contact);
			setAppContactDataFetched(true);
			Object.keys(platforms).length > 0 && setAppContactPlatformsData(platforms);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const img = "ml-2 border border-1 border-teal rounded-full bg-white";

	const Paragraph = React.forwardRef<
		HTMLParagraphElement,
		React.HTMLAttributes<HTMLParagraphElement>
	>(({ className, ...props }, ref) => (
		<p
			ref={ref}
			className={cn("max-w-[600px] text-gray-500 md:text-l/relaxed lg:text-base/relaxed xl:text-l/relaxed dark:text-gray-400 flex flex-row", className)}
			{...props}
		/>
	))
	Paragraph.displayName = "Paragraph";

	const clearEmailParameters = () => {
		setName("");
		setEmail("");
		setMessage("");
	}
	const emptyCheck = (str: String) => {
		let flag = true;
		if (str === null || str === undefined || str === "" || str.length === 0) flag = false;
		return flag;
	}

	const _showModal = (msg: String) => {
		const data = {
			name: name,
			email: email,
			msg: msg,
			req: message
		}
		setModalData(data);
		setShowModal(true)
	}

	const onEmailSubmit = (e: any) => {
		e.preventDefault();
		if (!emptyCheck(name) || !emptyCheck(email) || !emptyCheck(message)) {
			_showModal("All values in form are mandatory");
			return;
		}
		const { serviceId, templateId, publicKey } = Email(null);
		const templateParams = {
			from_name: name,
			from_email: email,
			to_name: "Krishnam Seeds",
			message: message
		}
		setRequestInProcess(true);
		emailjs.send(serviceId!, templateId!, templateParams, publicKey).then((response: any) => {
			console.info("Email request successfully sent. And the response is: ", response);
			clearEmailParameters();
			_showModal("Email request successfully sent");
			setRequestInProcess(false);
		}).catch((err: any) => {
			console.error("Error sending email request: ", err);
			setRequestInProcess(false);
			_showModal("Error sending your email, contact Admin");
		});
	}

	const closeModal = () => {
		setShowModal(false);
	}

	return (
		<div>
			<Navbar />
			<div>
				<section className="w-full min-h-[calc(100svh-60svh)] flex justify-center py-12 md:py-24 lg:py-32 border-t" id="contact">
					<div className="container flex items-center justify-center flex-col gap-4 px-4 text-center md:px-6">
						<div className="space-y-3">
							<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
								Get in Touch
							</h2>
							<p className="mx-auto max-w-[600px] text-slate-400 md:text-l/relaxed lg:text-base/relaxed xl:text-l/relaxed dark:text-slate-50">
								Wanna Purchase Something? Please fill out the form with your request in the message and click submit to send us an email.
							</p>
						</div>
						<div className="mx-auto w-full max-w-sm space-y-2">
							<form className="flex flex-col space-y-2" onSubmit={onEmailSubmit}>
								<Input className="max-w-lg" placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
								<Input className="max-w-lg" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
								<Textarea className="max-w-lg" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
								<Button type="submit" disabled={requestInProcess}>Submit</Button>
							</form>
						</div>
						<div>
							<NotificatioPopUp isOpen={showModal} from={email} modalData={modalData} onClose={closeModal} />
						</div>
					</div>
				</section>
				<div className="border border-t-1 border-slate-500"></div>
				<div className="flex min-w-full justify-center">
					<div className="container flex flex-col md:flex-row m-10 justify-between box-sizing: border-box">
						{
							(appContactData.length > 0 && Object.keys(appContactPlatformsData).length > 0) &&
							(
								appContactData.map((el, idx: number) => {
									return (<div className="flex flex-col border rounded-sm border-slate-500 p-6 min-w-80 min-h-60 m-1" key={el.role}>
										<h3 className="text-l font-medium tracking-tighter md:text-2xl/tight justify-center align-middle capitalize">
											{el.role}
										</h3>
										<div className="p-2 min-h-28 pt-4">
											<Paragraph>{el.name}</Paragraph>
											<Paragraph><MdEmail className="mt-1 mr-0.5" /> {el.email}</Paragraph>
											<Paragraph><MdOutlinePhoneIphone className="mt-1 mr-0.5" />{el.phone}</Paragraph>
										</div>
										<div className=" w-full max-w-sm">
											<Paragraph className="mt-1 mb-0 mr-0.5">Socials ⬇</Paragraph>
											<nav className="h-14 flex items-center">
												{
													el.links.map((pl) => {
														return (
															<div key={`${el.name}-${pl.platform}`}>
																{
																	pl.link.length == 0 && (<div className="hidden" />)
																}
																{
																	pl.link.length > 0 && (
																		<a title="Avatar" href={pl.link} key={pl.link} target="_blank">
																			<Avatar alt={pl.platform} src={appContactPlatformsData[toLower(pl.platform)]} className={img} style={{ width: '1.5rem', height: '1.5rem' }} />
																		</a>
																	)
																}
															</div>
														)
													})
												}
											</nav>
										</div>
									</div>)
								})
							)
						}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

function toLower<T>(str:T): T{
	return String(str).toLocaleLowerCase() as T;
}