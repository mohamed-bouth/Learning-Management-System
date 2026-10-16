import { completeResourceProgression } from "./progress.service.js";

async function complete(req, res, next) {
	try {
		const progression = await completeResourceProgression(
			req.params.id,
			req.user,
		);

		return res.status(200).json({
			success: true,
			data: { progression },
		});
	} catch (error) {
		return next(error);
	}
}

export { complete };
