import type { Lead, } from "@/types/leads";
import { getStatusColor } from "@/utils/status-colors";
import { Bullseye } from "./icons/bullseye";
import { Envelope } from "./icons/envelope";
import { Badge } from "./ui/badge";
import { CardItem, InformationCard } from "./ui/information-card";
import { SlideOverBody, SlideOverFooter, SlideOverPanel } from "./ui/slide-over-panel";

interface Props {
	isSlideOverOpen: boolean;
	handleCloseSlideOver: () => void;
	selectedLead: Lead | null;
}

export function LeadInformationPanel({
	isSlideOverOpen,
	handleCloseSlideOver,
	selectedLead,
}: Props) {
	return (
		<SlideOverPanel
			className="bg-zinc-800 border-none"
			open={isSlideOverOpen}
			onClose={handleCloseSlideOver}
			title={selectedLead ? `Lead Details - ${selectedLead.name}` : "Lead Details"}
			size="lg"
		>
			{selectedLead && (
				<>
					<SlideOverBody>
						<div className="space-y-6">
							<InformationCard title="Contact Information" icon={<Envelope className="w-5 h-5" />}>
								<CardItem label="Name" content={selectedLead.name} />
								<CardItem label="Email" content={selectedLead.email} />
                <CardItem label="Company" content={selectedLead.company} />
							</InformationCard>

							<InformationCard title="Lead Status" icon={<Bullseye className="w-5 h-5" />}>
								<CardItem label="Source" content={selectedLead.source} />
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">Status</p>
									<Badge className={getStatusColor[selectedLead.status]} variant="default">
										{selectedLead.status}
									</Badge>
								</div>
                <div className="space-y-1">
									<p className="text-sm text-muted-foreground">Score</p>
									<p>
										{selectedLead.score}
                  </p>
								</div>
							</InformationCard>
						</div>
					</SlideOverBody>

					<SlideOverFooter>
						<p>Footer</p>
					</SlideOverFooter>
				</>
			)}
		</SlideOverPanel>
	);
}
