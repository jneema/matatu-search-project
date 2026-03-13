export async function submitContribution(mode, formData) {
  if (mode === "town") {
    await fetch("/towns/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: formData.name }),
    });
  }
  if (mode === "bulk-towns") {
    for (const name of formData.towns)
      await fetch(`/towns/new?name=${encodeURIComponent(name)}`, {
        method: "POST",
      });
  }
  if (mode === "road") {
    await fetch("/roads/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ town: formData.town, road: formData.road }),
    });
  }
  if (mode === "bulk-roads") {
    await fetch("/roads/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ town: formData.town, roads: formData.roads }),
    });
  }
  if (mode === "destination") {
    await fetch("/destinations/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        town: "Nairobi",
        road: formData.road,
        name: formData.destination,
        departure: formData.departure,
        distance: formData.distance,
      }),
    });
  }
  if (mode === "bulk-destinations") {
    await fetch("/destinations/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destinations: formData.destinations.map((d) => ({
          town: "Nairobi",
          road: d.road,
          name: d.destination,
          departure: d.departure,
          distance: d.distance,
        })),
      }),
    });
  }
  if (mode === "sacco") {
    await fetch("/saccos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        contacts: formData.contacts,
        matatus: formData.matatus,
      }),
    });
  }
  if (mode === "matatu") {
    const fd = new FormData();
    const { stageImage, matatuImage, ...rest } = formData;
    fd.append(
      "data",
      JSON.stringify({
        ...rest,
        destinationId: Number(rest.destinationId),
        peakFareInbound: Number(rest.peakFareInbound),
        peakFareOutbound: Number(rest.peakFareOutbound),
        offPeakFare: Number(rest.offPeakFare),
        sacco_id: 0,
        destination_id: Number(rest.destinationId),
      }),
    );
    if (stageImage) fd.append("stage_image", stageImage);
    if (matatuImage) fd.append("matatu_image", matatuImage);
    await fetch("/saccos/matatus", { method: "POST", body: fd });
  }
  if (mode === "route") {
    const routePayload = {
      town: formData.town,
      road: formData.road,
      destination: formData.destination,
      departure: formData.departure,
      distance: formData.distance,
      matatus: formData.matatus.map(
        ({
          stageImage,
          matatuImage,
          peakFare,
          offPeakFare,
          stageLocationDestination,
          stageLocationDeparture,
          type,
          dropoffs,
          ...rest
        }) => ({
          ...rest,
          cbdStage: stageLocationDeparture,
          estateStage: stageLocationDestination,
          peakFareInbound: Number(peakFare),
          peakFareOutbound: Number(peakFare),
          offPeakFare: Number(offPeakFare),
          isExpress: type === "Express",
          isElectric: false,
        }),
      ),
    };
    const res = await fetch("/routes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(routePayload),
    });
    const { destination_id } = await res.json();
    for (const m of formData.matatus) {
      if (!m.stageImage && !m.matatuImage) continue;
      const fd = new FormData();
      fd.append(
        "data",
        JSON.stringify({
          saccoName: m.saccoName,
          destinationId: destination_id,
          cbdStage: m.stageLocationDeparture,
          estateStage: m.stageLocationDestination,
          peakFareInbound: Number(m.peakFare),
          peakFareOutbound: Number(m.peakFare),
          offPeakFare: Number(m.offPeakFare),
          payment: m.payment,
          isExpress: m.type === "Express",
          isElectric: false,
          sacco_id: 0,
          destination_id,
        }),
      );
      if (m.stageImage) fd.append("stage_image", m.stageImage);
      if (m.matatuImage) fd.append("matatu_image", m.matatuImage);
      await fetch("/saccos/matatus", { method: "POST", body: fd });
    }
  }
}
