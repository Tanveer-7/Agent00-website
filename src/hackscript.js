var code = `phys_addr_t acpi_pci_root_get_mcfg_addr(acpi_handle handle)
{
	acpi_status status = AE_NOT_EXIST;
	unsigned long long mcfg_addr;

	if (handle)
		status = acpi_evaluate_integer(handle, METHOD_NAME__CBA,
					       NULL, &mcfg_addr);
	if (ACPI_FAILURE(status))
		return 0;

	return (phys_addr_t)mcfg_addr;
}

static acpi_status decode_type0_hpx_record(union acpi_object *record,
					   struct hotplug_params *hpx)
{
	int i;
	union acpi_object *fields = record->package.elements;
	u32 revision = fields[1].integer.value;

	switch (revision) {
	case 1:
		if (record->package.count != 6)
			return AE_ERROR;
		for (i = 2; i < 6; i++)
			if (fields[i].type != ACPI_TYPE_INTEGER)
				return AE_ERROR;
		hpx->t0 = &hpx->type0_data;
		hpx->t0->revision        = revision;
		hpx->t0->cache_line_size = fields[2].integer.value;
		hpx->t0->latency_timer   = fields[3].integer.value;
		hpx->t0->enable_serr     = fields[4].integer.value;
		hpx->t0->enable_perr     = fields[5].integer.value;
		break;
	default:
		printk(KERN_WARNING
		       "%s: Type 0 Revision %d record not supported\n",
		       __func__, revision);
		return AE_ERROR;
	}
	return AE_OK;
}

static acpi_status decode_type1_hpx_record(union acpi_object *record,
					   struct hotplug_params *hpx)
{
	int i;
	union acpi_object *fields = record->package.elements;
	u32 revision = fields[1].integer.value;

	switch (revision) {
	case 1:
		if (record->package.count != 5)
			return AE_ERROR;
		for (i = 2; i < 5; i++)
			if (fields[i].type != ACPI_TYPE_INTEGER)
				return AE_ERROR;
		hpx->t1 = &hpx->type1_data;
		hpx->t1->revision      = revision;
		hpx->t1->max_mem_read  = fields[2].integer.value;
		hpx->t1->avg_max_split = fields[3].integer.value;
		hpx->t1->tot_max_split = fields[4].integer.value;
		break;
	default:
		printk(KERN_WARNING
		       "%s: Type 1 Revision %d record not supported\n",
		       __func__, revision);
		return AE_ERROR;
	}
	return AE_OK;
}

static acpi_status decode_type2_hpx_record(union acpi_object *record,
					   struct hotplug_params *hpx)
{
	int i;
	union acpi_object *fields = record->package.elements;
	u32 revision = fields[1].integer.value;

	switch (revision) {
	case 1:
		if (record->package.count != 18)
			return AE_ERROR;
		for (i = 2; i < 18; i++)`;

export default code;
