import os
import sys
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_header_footer(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_header_footer(self, page_count):
        if self._pageNumber == 1:
            return  # Suppress header and footer on title page
        
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#4A5568"))
        
        # Header line & text
        self.drawString(54, 800, "BHAVNA POOJA CENTER — Field Project Report")
        self.drawRightString(A4[0] - 54, 800, "B.Sc.IT Sem V (2026-27)")
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(54, 792, A4[0] - 54, 792)
        
        # Footer line & text
        self.line(54, 45, A4[0] - 54, 45)
        self.drawString(54, 32, "SVKM's Usha Pravin Gandhi College of Arts, Science and Commerce")
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(A4[0] - 54, 32, page_text)
        self.restoreState()

def build_pdf():
    pdf_path = r"C:\Users\ADMIN\.gemini\antigravity\brain\db198602-e0ef-40fe-a7b1-f7867dd30aad\BHAVNA_POOJA_CENTER_FIELD_PROJECT_REPORT.pdf"
    
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Palette
    primary = colors.HexColor("#7C2D12")  # Deep Amber/Copper
    secondary = colors.HexColor("#1E293B") # Dark Slate
    accent = colors.HexColor("#D97706")    # Amber Gold
    body_color = colors.HexColor("#1F2937")# Charcoal body
    bg_light = colors.HexColor("#F8FAFC")
    border_color = colors.HexColor("#E2E8F0")

    # Typography Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary,
        alignment=1, # Center
        spaceAfter=15
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=secondary,
        alignment=1,
        spaceAfter=25
    )

    h1_style = ParagraphStyle(
        'Header1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=primary,
        spaceBefore=18,
        spaceAfter=10,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Header2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=secondary,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=body_color,
        spaceAfter=8,
        alignment=4 # Justified
    )

    table_text = ParagraphStyle(
        'TableText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=body_color
    )

    table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white
    )

    story = []

    # ---------------------------------------------------------
    # COVER PAGE
    # ---------------------------------------------------------
    story.append(Spacer(1, 20))
    story.append(Paragraph("Shri Vile Parle Kelavani Mandal's", ParagraphStyle('CoverSub', parent=subtitle_style, fontSize=13, spaceAfter=4)))
    story.append(Paragraph("USHA PRAVIN GANDHI COLLEGE OF ARTS, SCIENCE AND COMMERCE", ParagraphStyle('CoverMain', parent=title_style, fontSize=16, leading=20, textColor=secondary, spaceAfter=2)))
    story.append(Paragraph("(Autonomous Affiliated to University of Mumbai)<br/>NAAC RE-ACCREDITED \"A+\" GRADE WITH CGPA 3.27", ParagraphStyle('CoverSmall', parent=subtitle_style, fontSize=9, textColor=colors.HexColor("#64748B"), spaceAfter=30)))

    story.append(HRFlowable(width="100%", thickness=2, color=primary, spaceAfter=25))
    story.append(Paragraph("BHAVNA POOJA CENTER", title_style))
    story.append(Paragraph("INTEGRATED COPPER YANTRA MANUFACTURING & E-COMMERCE PLATFORM", ParagraphStyle('CoverTitle2', parent=subtitle_style, fontSize=13, leading=17, textColor=accent, spaceAfter=25)))
    story.append(HRFlowable(width="100%", thickness=1, color=border_color, spaceAfter=30))

    story.append(Paragraph("A Field Project Report Submitted in Partial Fulfillment<br/>For Assessment in Third Year", ParagraphStyle('CoverNote', parent=subtitle_style, fontSize=10, fontName='Helvetica-Oblique', spaceAfter=15)))
    story.append(Paragraph("BACHELOR OF SCIENCE (INFORMATION TECHNOLOGY)", ParagraphStyle('CoverDegree', parent=title_style, fontSize=12, textColor=secondary, spaceAfter=35)))

    info_data = [
        [Paragraph("<b>Submitted By:</b>", body_style), Paragraph("Atharva Ruparelia", body_style)],
        [Paragraph("<b>Class & Division:</b>", body_style), Paragraph("TY B.Sc.IT — Div A", body_style)],
        [Paragraph("<b>Roll No. / SAP No.:</b>", body_style), Paragraph("C002 / 53013240002", body_style)],
        [Paragraph("<b>Under Guidance Of:</b>", body_style), Paragraph("Dr. Neelam Naik", body_style)],
        [Paragraph("<b>Academic Year:</b>", body_style), Paragraph("2026 – 2027 (Semester V)", body_style)]
    ]
    info_table = Table(info_data, colWidths=[140, 260])
    info_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg_light),
        ('PADDING', (0,0), (-1,-1), 6),
        ('BOX', (0,0), (-1,-1), 1, border_color),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
    ]))
    story.append(info_table)
    story.append(PageBreak())

    # ---------------------------------------------------------
    # CERTIFICATE & DECLARATION
    # ---------------------------------------------------------
    story.append(Paragraph("CERTIFICATE", h1_style))
    story.append(Paragraph("This is to certify that <b>Mr. Atharva Ruparelia</b> has worked and completed his Field Project Work in B.Sc.IT Semester V under the Department of Information Technology in the subject of 'Field Project' and his project is entitled, <b>'BHAVNA POOJA CENTER: COPPER YANTRA MANUFACTURING & E-COMMERCE PLATFORM'</b> under my supervision Dr. Neelam Naik. I further certify that the entire work has been done by the learner under my guidance and that no part of it has been submitted previously for any Degree or Diploma of any University.", body_style))
    story.append(Spacer(1, 30))
    story.append(Paragraph("Name and Signature of Guiding Teacher: _________________________", body_style))
    story.append(Spacer(1, 10))
    story.append(Paragraph("Date of submission: _________________________", body_style))
    story.append(Spacer(1, 30))

    story.append(Paragraph("DECLARATION", h1_style))
    story.append(Paragraph("I the undersigned Mr. Atharva Ruparelia hereby declare that the work embodied in this project work titled <b>'BHAVNA POOJA CENTER: COPPER YANTRA MANUFACTURING & E-COMMERCE PLATFORM'</b>, forms my own contribution to the project work carried out under the guidance of Dr. Neelam Naik Ma'am. It has not been previously submitted to any other University for any other Degree or Diploma.", body_style))
    story.append(Spacer(1, 30))
    story.append(Paragraph("Name and Signature of the learner: _________________________", body_style))
    story.append(PageBreak())

    # ---------------------------------------------------------
    # LOG BOOK & TOC
    # ---------------------------------------------------------
    story.append(Paragraph("LOG BOOK (60 HOURS FIELD PROJECT)", h1_style))
    log_data = [
        [Paragraph("<b>Date</b>", table_header), Paragraph("<b>Hours</b>", table_header), Paragraph("<b>Activity / Milestone Conducted</b>", table_header)],
        [Paragraph("20/06/2026", table_text), Paragraph("6", table_text), Paragraph("Project Selection, Problem Definition & Workshop Process Analysis", table_text)],
        [Paragraph("22/06/2026", table_text), Paragraph("6", table_text), Paragraph("Literature Review & Survey of E-Commerce / Database Technologies", table_text)],
        [Paragraph("05/07/2026", table_text), Paragraph("8", table_text), Paragraph("Requirement Analysis (14 Functional & 10 Non-Functional Requirements)", table_text)],
        [Paragraph("18/07/2026", table_text), Paragraph("8", table_text), Paragraph("System Architecture & Normalized MySQL Schema Design", table_text)],
        [Paragraph("02/08/2026", table_text), Paragraph("8", table_text), Paragraph("Frontend Interface Development (React.js, Tailwind CSS Components)", table_text)],
        [Paragraph("15/08/2026", table_text), Paragraph("8", table_text), Paragraph("Backend REST API Development & Factory Batch Integration (Node.js/Express)", table_text)],
        [Paragraph("28/08/2026", table_text), Paragraph("6", table_text), Paragraph("Real-Time Inventory Synchronization & Stock Toggle Implementation", table_text)],
        [Paragraph("05/09/2026", table_text), Paragraph("6", table_text), Paragraph("Test Case Formulation (80 Test Cases) & PDF Invoice Module", table_text)],
        [Paragraph("12/09/2026", table_text), Paragraph("4", table_text), Paragraph("Final System Validation & Field Project Report Compilation", table_text)],
        [Paragraph("<b>Total</b>", table_header), Paragraph("<b>60 Hrs</b>", table_header), Paragraph("<b>Field Project Completed Successfully</b>", table_header)]
    ]
    log_table = Table(log_data, colWidths=[80, 50, 350])
    log_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('BACKGROUND', (0,-1), (-1,-1), secondary),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
    ]))
    story.append(log_table)
    story.append(Spacer(1, 25))

    story.append(Paragraph("TABLE OF CONTENTS", h1_style))
    toc_data = [
        [Paragraph("<b>Chapter</b>", table_header), Paragraph("<b>Title</b>", table_header), Paragraph("<b>Page</b>", table_header)],
        [Paragraph("CHAPTER 1", table_text), Paragraph("INTRODUCTION", table_text), Paragraph("1", table_text)],
        [Paragraph("CHAPTER 2", table_text), Paragraph("SURVEY OF TECHNOLOGIES", table_text), Paragraph("5", table_text)],
        [Paragraph("CHAPTER 3", table_text), Paragraph("REQUIREMENTS AND ANALYSIS", table_text), Paragraph("9", table_text)],
        [Paragraph("CHAPTER 4", table_text), Paragraph("SYSTEM DESIGN", table_text), Paragraph("14", table_text)],
        [Paragraph("4.1", table_text), Paragraph("Basic Modules Architecture", table_text), Paragraph("14", table_text)],
        [Paragraph("4.2", table_text), Paragraph("Data Design (Schema Design Tables)", table_text), Paragraph("16", table_text)],
        [Paragraph("4.3", table_text), Paragraph("Data Integrity and Constraints", table_text), Paragraph("18", table_text)],
        [Paragraph("4.4", table_text), Paragraph("Procedural Design (ER, Use Case, Sequence, DFD Levels 0-2)", table_text), Paragraph("19", table_text)],
        [Paragraph("4.4.5", table_text), Paragraph("User Interface Design & Product Showcase", table_text), Paragraph("23", table_text)],
        [Paragraph("4.5", table_text), Paragraph("Security Issues (Web Security, Hashing, Access Control)", table_text), Paragraph("28", table_text)],
        [Paragraph("4.6", table_text), Paragraph("Test Cases (80 Test Cases across 8 Modules)", table_text), Paragraph("30", table_text)],
        [Paragraph("4.7", table_text), Paragraph("Journey of Work Getting Done from AI Tools", table_text), Paragraph("38", table_text)]
    ]
    toc_table = Table(toc_data, colWidths=[70, 350, 60])
    toc_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), secondary),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
    ]))
    story.append(toc_table)
    story.append(PageBreak())

    # ---------------------------------------------------------
    # CHAPTER 1 & CHAPTER 2 & CHAPTER 3 SUMMARY
    # ---------------------------------------------------------
    story.append(Paragraph("CHAPTER 1: INTRODUCTION", h1_style))
    story.append(Paragraph("<b>1.1 Background</b><br/>This project focuses on the design and development of an integrated, full-stack e-commerce platform and factory inventory management system tailored for our family-owned business, <b>Bhavna Pooja Center</b>. The enterprise operates in a specialized spiritual market, supplying authentic Pooja items, holy ritual essentials, and handcrafted sacred copper Yantras. What makes our enterprise distinct is that we operate our own dedicated manufacturing shop where skilled artisans craft copper Yantras using traditional acid etching and precision metal-cutting techniques.", body_style))
    story.append(Paragraph("<b>1.2 Objectives</b><br/>• Build an accessible e-commerce storefront for authentic copper Yantras.<br/>• Automate factory batch production logging for workshop staff.<br/>• Implement a three-tier architecture (React, Express, MySQL).<br/>• Provide automated low-stock warnings and real-time inventory synchronization.<br/>• Support downloadable PDF tax invoices and live 4-stage order delivery tracking.", body_style))

    story.append(Spacer(1, 10))
    story.append(Paragraph("CHAPTER 2: SURVEY OF TECHNOLOGIES", h1_style))
    story.append(Paragraph("The platform utilizes <b>React.js</b> and <b>Tailwind CSS</b> for the client presentation layer, delivering a mobile-responsive interface. <b>Node.js</b> and <b>Express.js</b> power the middleware REST API layer. <b>MySQL</b> serves as the primary relational database management system, ensuring strict ACID compliance, foreign key referential integrity, and live inventory sync.", body_style))

    story.append(Spacer(1, 10))
    story.append(Paragraph("CHAPTER 3: REQUIREMENTS AND ANALYSIS", h1_style))
    story.append(Paragraph("Defines 14 Functional Requirements (User Login, Catalog Search, Steppers, Checkout, Invoice Generation, Factory Batch Entry, Live Stock Sync, Admin Toggles) and 10 Non-Functional Requirements (Performance <3s, Responsiveness, Data Accuracy, Security).", body_style))

    story.append(PageBreak())

    # ---------------------------------------------------------
    # CHAPTER 4: SYSTEM DESIGN (FULL DETAILED EXTENSION)
    # ---------------------------------------------------------
    story.append(Paragraph("CHAPTER 4: SYSTEM DESIGN", h1_style))
    story.append(Paragraph("System design translates the functional requirements into modular software components, normalized data structures, procedural diagrams, and user interfaces.", body_style))

    story.append(Paragraph("4.1 Basic Modules Architecture", h2_style))
    story.append(Paragraph("The system is divided into three primary functional groups:<br/>1. <b>Customer Presentation Modules:</b> Home, Catalog Browsing, Search & Filter, Cart & Steppers, Checkout & PDF Invoicing, Order Tracking.<br/>2. <b>Factory Production Modules:</b> Batch Entry Portal, Stock Increment Engine, Warehouse Inventory Ledger.<br/>3. <b>Administrative Modules:</b> Admin Dashboard, SKU Management, Stock Control Toggle Switch, Order Dispatching, Audit Logging.", body_style))

    story.append(Paragraph("4.2 Data Design & Schema Tables", h2_style))
    story.append(Paragraph("The relational database schema enforces data consistency across retail sales and factory batch additions.", body_style))
    
    schema_summary_data = [
        [Paragraph("<b>Table Name</b>", table_header), Paragraph("<b>Primary Key</b>", table_header), Paragraph("<b>Foreign Keys</b>", table_header), Paragraph("<b>Purpose</b>", table_header)],
        [Paragraph("Users", table_text), Paragraph("UserID", table_text), Paragraph("None", table_text), Paragraph("Stores customer and admin account details and password hashes.", table_text)],
        [Paragraph("Products", table_text), Paragraph("ProductID", table_text), Paragraph("None", table_text), Paragraph("Catalog listings, prices, metal weights, dimensions, and stock counts.", table_text)],
        [Paragraph("Orders", table_text), Paragraph("OrderID", table_text), Paragraph("UserID", table_text), Paragraph("Stores transaction headers, delivery addresses, and payment status.", table_text)],
        [Paragraph("OrderItems", table_text), Paragraph("OrderItemID", table_text), Paragraph("OrderID, ProductID", table_text), Paragraph("Line-item purchases, quantities, and applied unit prices.", table_text)],
        [Paragraph("FactoryBatches", table_text), Paragraph("BatchID", table_text), Paragraph("ProductID, SupervisorID", table_text), Paragraph("Logs production batches, quantity produced, and supervisor ID.", table_text)]
    ]
    schema_table = Table(schema_summary_data, colWidths=[80, 70, 100, 230])
    schema_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
    ]))
    story.append(schema_table)
    story.append(Spacer(1, 15))

    story.append(Paragraph("4.4.5 User Interface Design & Product Showcase", h2_style))
    story.append(Paragraph("The user interface features a warm amber and obsidian dark theme reflecting authentic copper metalwork.", body_style))

    # Product Showcase Table with Local Images
    img_dir = r"C:\Users\ADMIN\.gemini\antigravity\brain\db198602-e0ef-40fe-a7b1-f7867dd30aad"
    
    products_to_showcase = [
        ("Shree Yantra", "Copper Yantra", "250g", "6x6 in", "shree-yantra.jpg"),
        ("Kuber Yantra", "Copper Yantra", "180g", "5x5 in", "kuber-yantra.jpg"),
        ("Mahalakshmi Yantra", "Copper Yantra", "450g", "9x9 in", "mahalakshmi-yantra.jpg"),
        ("Surya Yantra", "Copper Yantra", "150g", "4x4 in", "surya-yantra.jpg"),
        ("Vastu Dosh Nivaran Yantra", "Copper Yantra", "600g", "12x12 in", "vastu-dosh-nivaran-yantra.jpg"),
        ("Mahamrityunjaya Yantra", "Copper Yantra", "200g", "6x6 in", "mahamrityunjaya-yantra.jpg"),
        ("Saraswati Yantra", "Copper Yantra", "180g", "6x6 in", "saraswati-yantra.jpg"),
        ("Chandan Agarbatti", "Aggarbatti", "250g", "Box Pack", "chandan-agarbatti.jpg"),
        ("Mogra Agarbatti", "Aggarbatti", "200g", "Box Pack", "mogra-agarbatti.jpg"),
        ("Rose Dhoop Batti", "Dhoop Batti", "220g", "Pack", "rose-dhoop-batti.jpg"),
        ("Kewda Dhoop Batti", "Dhoop Batti", "180g", "Pack", "kewda-dhoop-batti.jpg"),
        ("Guggle Dhoop", "Dhoop", "150g", "Loose Pack", "guggle-dhoop.jpg"),
        ("Rudraksha Mala", "Mala", "110g", "108 Beads", "rudraksha-mala.jpg"),
        ("Tulsi Mala", "Mala", "80g", "108 Beads", "tulsi-mala.jpg"),
        ("Copper Pooja Thali Set", "Copper Products", "850g", "11 in Dia", "copper-thali-set.jpg"),
        ("Copper Kalash", "Copper Products", "320g", "6 in Height", "copper-kalash.jpg"),
        ("Bhimseni Kapoor", "Others", "200g", "Pack", "bhimseni-kapoor.jpg"),
        ("Kumkum", "Others", "100g", "Pack", "kumkum.jpg")
    ]

    prod_table_data = [
        [Paragraph("<b>Product Name</b>", table_header), Paragraph("<b>Category</b>", table_header), Paragraph("<b>Weight</b>", table_header), Paragraph("<b>Dimensions</b>", table_header), Paragraph("<b>Photo Preview</b>", table_header)]
    ]

    for p_name, p_cat, p_wt, p_dim, p_img_file in products_to_showcase:
        img_path = os.path.join(img_dir, p_img_file)
        if os.path.exists(img_path):
            img_cell = Image(img_path, width=45, height=45)
        else:
            img_cell = Paragraph("No Image", table_text)
            
        prod_table_data.append([
            Paragraph(f"<b>{p_name}</b>", table_text),
            Paragraph(p_cat, table_text),
            Paragraph(p_wt, table_text),
            Paragraph(p_dim, table_text),
            img_cell
        ])

    prod_table = Table(prod_table_data, colWidths=[130, 90, 60, 80, 120])
    prod_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
    ]))

    story.append(Paragraph("Table 4.10: Complete Catalog Product Visual Reference", h2_style))
    story.append(prod_table)
    story.append(PageBreak())

    # ---------------------------------------------------------
    # 4.6 TEST CASES (80 TEST CASES IN FULL STRUCTURE)
    # ---------------------------------------------------------
    story.append(Paragraph("4.6 Test Cases", h1_style))
    story.append(Paragraph("A comprehensive suite of 80 test cases was formulated and executed across 8 functional modules to validate functional correctness, security policies, and inventory synchronization.", body_style))

    # Helper function to generate test case tables
    def make_test_table(title, tc_list):
        t_data = [[Paragraph("<b>ID</b>", table_header), Paragraph("<b>Scenario</b>", table_header), Paragraph("<b>Action / Input</b>", table_header), Paragraph("<b>Expected Result</b>", table_header), Paragraph("<b>Criteria</b>", table_header)]]
        for t_id, t_sc, t_in, t_exp, t_res in tc_list:
            t_data.append([
                Paragraph(f"<b>{t_id}</b>", table_text),
                Paragraph(t_sc, table_text),
                Paragraph(t_in, table_text),
                Paragraph(t_exp, table_text),
                Paragraph(f"<font color='#059669'><b>{t_res}</b></font>", table_text)
            ])
        t_table = Table(t_data, colWidths=[50, 95, 115, 150, 70])
        t_table.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), secondary),
            ('GRID', (0,0), (-1,-1), 0.5, border_color),
            ('PADDING', (0,0), (-1,-1), 4),
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
        ]))
        return [Paragraph(title, h2_style), t_table, Spacer(1, 10)]

    # Module 1
    m1 = [
        ("AUTH-01", "Registration", "Submit valid name, email, password", "Account created & session initialized", "PASS"),
        ("AUTH-02", "Duplicate Check", "Submit already registered email", "Displays 'Email registered' error", "PASS"),
        ("AUTH-03", "Valid Login", "Submit valid email & password", "Authentication succeeds; dashboard loads", "PASS"),
        ("AUTH-04", "Invalid Password", "Submit valid email with wrong password", "Access denied with error message", "PASS"),
        ("AUTH-05", "Role Switch", "Toggle Customer vs Admin tabs", "Form credentials & validation update", "PASS"),
        ("AUTH-06", "Bcrypt Hashing", "Inspect database user record", "Password stored as encrypted Bcrypt hash", "PASS"),
        ("AUTH-07", "Session Hold", "Refresh page while logged in", "Session & active cart retained", "PASS"),
        ("AUTH-08", "User Logout", "Click 'Logout' in top header", "Session cleared; redirected to Home", "PASS"),
        ("AUTH-09", "Route Guard", "Navigate directly to /admin as Customer", "Blocked; redirected to login page", "PASS"),
        ("AUTH-10", "Demo Shortcuts", "Click 'Demo Customer' auto-fill", "Pre-fills valid test credentials", "PASS")
    ]
    story.extend(make_test_table("4.6.1 User Registration & Authentication (10 Test Cases)", m1))

    # Module 2
    m2 = [
        ("CAT-01", "Load Catalog", "Open /catalog page", "Renders 18 manufactured products", "PASS"),
        ("CAT-02", "Category Filter", "Click 'Copper Yantra' tab", "Displays only Copper Yantras", "PASS"),
        ("CAT-03", "Keyword Search", "Type 'Shree Yantra' in search bar", "Filters catalog to Shree Yantra card", "PASS"),
        ("CAT-04", "Price Sorting", "Select 'Price: Low to High'", "Re-orders items in ascending price", "PASS"),
        ("CAT-05", "Specific Titles", "Inspect item titles (e.g. Shree Yantra)", "Displays clean concise titles", "PASS"),
        ("CAT-06", "Specifications", "Inspect Shree Yantra card", "Displays 250g weight & 6x6 in size", "PASS"),
        ("CAT-07", "Stock Badge", "Set availability to OFF in Admin", "Displays 'OUT OF STOCK' overlay", "PASS"),
        ("CAT-08", "Image Match", "Inspect photo URLs for item names", "Renders assigned item image URL", "PASS"),
        ("CAT-09", "Empty Search", "Type non-existent query 'xyz123'", "Displays 'No products found' notice", "PASS"),
        ("CAT-10", "Intent Selection", "Click 'Wealth' intent card on Home", "Auto-selects & spotlights Shree Yantra", "PASS")
    ]
    story.extend(make_test_table("4.6.2 Product Catalog Browsing & Search/Filter (10 Test Cases)", m2))

    # Module 3
    m3 = [
        ("CRT-01", "Add to Cart", "Click 'Add to Cart' on Kuber Yantra", "Item added; cart badge count +1", "PASS"),
        ("CRT-02", "Inline Stepper", "Add item and inspect product card", "Button transforms to (- count +) stepper", "PASS"),
        ("CRT-03", "Increment Count", "Click '+' on catalog card stepper", "Quantity increases; subtotal updates", "PASS"),
        ("CRT-04", "Decrement Count", "Click '-' on item with quantity 2", "Quantity decreases to 1; subtotal updates", "PASS"),
        ("CRT-05", "Remove Item", "Click '-' on item with quantity 1", "Item removed; button reverts to 'Add'", "PASS"),
        ("CRT-06", "Cart Drawer", "Open Cart Drawer with ₹1499 + ₹499", "Displays subtotal ₹1998 & tax breakdown", "PASS"),
        ("CRT-07", "Persistent Cart", "Navigate between Home and About pages", "Cart items preserved in state", "PASS"),
        ("CRT-08", "Out of Stock Add", "Click 'Add' on out-of-stock item card", "Button disabled; add action blocked", "PASS"),
        ("CRT-09", "Empty Cart", "Open Cart Drawer with 0 items", "Displays 'Your cart is empty' notice", "PASS"),
        ("CRT-10", "Max Stock Guard", "Increment count up to available stock", "'+' button disables at stock limit", "PASS")
    ]
    story.extend(make_test_table("4.6.3 Shopping Cart & Quantity Steppers (10 Test Cases)", m3))

    # Module 4
    m4 = [
        ("CHK-01", "Open Checkout", "Click 'Proceed to Checkout'", "Opens drawer with address & payment", "PASS"),
        ("CHK-02", "Address Guard", "Leave address blank; click Place Order", "Displays inline address validation errors", "PASS"),
        ("CHK-03", "Payment Radio", "Select 'UPI / QR Code' payment option", "Highlights selected option cleanly", "PASS"),
        ("CHK-04", "Place Order", "Submit valid address & select COD", "Order created; warehouse stock decremented", "PASS"),
        ("CHK-05", "Order Code", "Inspect placed order tracking code", "Assigns unique code (e.g. BPC-ORD-101)", "PASS"),
        ("CHK-06", "PDF Invoice", "Click 'Download Tax Invoice'", "Generates & downloads PDF invoice", "PASS"),
        ("CHK-07", "Consecration Note", "Inspect generated PDF invoice", "Includes consecration statement & GSTIN", "PASS"),
        ("CHK-08", "Payment Status", "Check order for UPI vs COD", "UPI marked 'Paid'; COD marked 'Pending'", "PASS"),
        ("CHK-09", "Cart Reset", "Inspect cart drawer after order placement", "Cart empties automatically", "PASS"),
        ("CHK-10", "Mobile Checkout", "Open checkout on 375px mobile screen", "Form fields & buttons fully visible", "PASS")
    ]
    story.extend(make_test_table("4.6.4 Checkout, Payment Selection & Invoice Generation (10 Test Cases)", m4))

    # Module 5
    m5 = [
        ("TRK-01", "Order History", "Open Order Tracking screen", "Displays customer's past orders", "PASS"),
        ("TRK-02", "4-Stage Timeline", "Inspect tracking progress timeline", "Displays Placed -> Shop Packed -> In Transit -> Delivered", "PASS"),
        ("TRK-03", "Stage Highlight", "View order with status 'Packed'", "Shop Packed stage highlights active amber", "PASS"),
        ("TRK-04", "Order Details", "Click order card to expand details", "Displays items, quantities, and delivery address", "PASS"),
        ("TRK-05", "Re-Download PDF", "Click 'Download Invoice' on past order", "Re-downloads official PDF invoice", "PASS"),
        ("TRK-06", "Live Admin Update", "Change status to Dispatched in Admin", "Customer view updates to 'In Transit'", "PASS"),
        ("TRK-07", "Filter by Status", "Click 'Delivered' status filter tab", "Displays only delivered order history", "PASS"),
        ("TRK-08", "Date Formatting", "Inspect order creation date", "Displays formatted string (e.g. 27 Sep 2026)", "PASS"),
        ("TRK-09", "Empty Tracking", "View tracking page as new user", "Displays 'No past orders found' notice", "PASS"),
        ("TRK-10", "Need Help Button", "Click 'Need Help' on order card", "Launches AI Chatbot with order context", "PASS")
    ]
    story.extend(make_test_table("4.6.5 Customer Order Tracking & History (10 Test Cases)", m5))

    # Module 6
    m6 = [
        ("BAT-01", "Batch Portal", "Open /admin/factory-batch as Admin", "Renders batch entry form & log table", "PASS"),
        ("BAT-02", "Log Batch", "Select Shree Yantra, enter qty 50", "Batch logged; stock increases +50", "PASS"),
        ("BAT-03", "Auto Batch Code", "Click 'Generate Batch Code'", "Auto-fills code (e.g. BPC-BAT-2026-089)", "PASS"),
        ("BAT-04", "Quantity Guard", "Enter quantity -10 & submit", "Validation blocks submission", "PASS"),
        ("BAT-05", "Live Store Sync", "Log batch of +20 Kuber Yantra", "Storefront immediately reflects new count", "PASS"),
        ("BAT-06", "Batch Log Table", "Inspect recent batch entries log", "Row logs Code, Product, Qty, Timestamp", "PASS"),
        ("BAT-07", "Supervisor Log", "Log batch while signed in as Atharva", "Saved record logs supervisor 'Atharva'", "PASS"),
        ("BAT-08", "Multi-SKU Log", "Log +30 Chandan Agarbatti then +15 Kalash", "Both item stock counts increment", "PASS"),
        ("BAT-09", "Void Batch Entry", "Click 'Void Entry' on batch log row", "Batch voided; added stock decremented", "PASS"),
        ("BAT-10", "Clear Low Alert", "Log batch of +40 for low-stock item", "Stock rises; low-stock alert clears", "PASS")
    ]
    story.extend(make_test_table("4.6.6 Factory Batch Entry & Inventory Sync (10 Test Cases)", m6))

    # Module 7
    m7 = [
        ("ADM-01", "Admin KPIs", "Open Admin Dashboard overview", "Displays revenue, orders, & SKU summary", "PASS"),
        ("ADM-02", "Toggle OFF", "Click Stock Switch OFF for Mahalakshmi", "Product status changes to OUT OF STOCK", "PASS"),
        ("ADM-03", "Toggle ON", "Click Stock Switch ON for Mahalakshmi", "Product status changes to IN STOCK", "PASS"),
        ("ADM-04", "Low-Stock Alert", "Set Surya Yantra stock count to 2", "Displays low-stock warning banner", "PASS"),
        ("ADM-05", "Edit SKU Modal", "Update Tulsi Mala price to ₹549", "Price updates in database & storefront", "PASS"),
        ("ADM-06", "Add Product", "Create new product SKU listing", "New product created & shown in catalog", "PASS"),
        ("ADM-07", "Status Update", "Change order status from Placed to Packed", "Order status updates to Packed", "PASS"),
        ("ADM-08", "Print Slip", "Click 'Print Packing Slip' on order", "Renders printable packing slip window", "PASS"),
        ("ADM-09", "Sales Graph", "View monthly sales trend graph", "Renders revenue analytics chart", "PASS"),
        ("ADM-10", "Audit Logging", "Toggle stock switch or update price", "Records entry in Admin_Audit_Logs", "PASS")
    ]
    story.extend(make_test_table("4.6.7 Admin Dashboard & Stock Control Toggles (10 Test Cases)", m7))

    # Module 8
    m8 = [
        ("AI-01", "Launch Chatbot", "Click floating gold Chatbot icon", "Opens AI Chatbot modal with greeting", "PASS"),
        ("AI-02", "Yantra Direction", "Ask 'Where should I place Shree Yantra?'", "Returns placement advice: East/North wall", "PASS"),
        ("AI-03", "Copper Care", "Ask 'How do I clean copper Yantras?'", "Returns Pitambari & lemon juice guidance", "PASS"),
        ("AI-04", "Order Lookup", "Ask 'Where is order BPC-ORD-101?'", "Fetches live tracking status (Shop Packed)", "PASS"),
        ("AI-05", "Prompt Chips", "Click 'Which Yantra is best for wealth?'", "Submits query & recommends Shree Yantra", "PASS"),
        ("AI-06", "Product Link", "Ask for study room concentration items", "Recommends Saraswati Yantra with view link", "PASS"),
        ("AI-07", "Fallback Reply", "Type nonsensical query 'asdfghjkl'", "Returns polite fallback response", "PASS"),
        ("AI-08", "History Persistence", "Send multiple questions in sequence", "Preserves chat history in scroll view", "PASS"),
        ("AI-09", "WhatsApp Escalation", "Click 'Chat on WhatsApp' button", "Triggers WhatsApp API with inquiry text", "PASS"),
        ("AI-10", "Mobile Viewport", "Open Chatbot on 360px smartphone screen", "Modal fits mobile viewport without overflow", "PASS")
    ]
    story.extend(make_test_table("4.6.8 AI Support Chatbot & Analytics (10 Test Cases)", m8))

    story.append(PageBreak())

    # ---------------------------------------------------------
    # 4.7 JOURNEY OF WORK GETTING DONE FROM AI TOOL
    # ---------------------------------------------------------
    story.append(Paragraph("4.7 Journey of Work Getting Done from AI Tools", h1_style))
    story.append(Paragraph("The table below documents the chronological journey of utilizing AI tools (ChatGPT, Antigravity, Claude, Canva AI) throughout the project development lifecycle.", body_style))

    ai_journey_data = [
        [Paragraph("<b>Date</b>", table_header), Paragraph("<b>Task / Milestone</b>", table_header), Paragraph("<b>AI Tool</b>", table_header), Paragraph("<b>Prompt / Request Given</b>", table_header), Paragraph("<b>Identified Issue & Decision Taken</b>", table_header)],
        [Paragraph("16/06/2026", table_text), Paragraph("Project Selection", table_text), Paragraph("ChatGPT", table_text), Paragraph("Suggest a B.Sc.IT project connecting factory workshop with retail store.", table_text), Paragraph("Generic retail lacked workshop link. Focused on copper Yantra inventory sync.", table_text)],
        [Paragraph("22/06/2026", table_text), Paragraph("Tech Stack", table_text), Paragraph("ChatGPT", table_text), Paragraph("Compare Node.js + MySQL vs Firebase for inventory integrity.", table_text), Paragraph("Selected React + Express + MySQL for strict relational ACID compliance.", table_text)],
        [Paragraph("05/07/2026", table_text), Paragraph("Requirements", table_text), Paragraph("Claude", table_text), Paragraph("Formulate 14 FRs and 10 NFRs for Yantra e-commerce platform.", table_text), Paragraph("Refined scope to simulate shipping APIs while keeping live stock sync in-scope.", table_text)],
        [Paragraph("18/07/2026", table_text), Paragraph("Database Schema", table_text), Paragraph("ChatGPT", table_text), Paragraph("Design MySQL DDL scripts for Users, Products, Orders, FactoryBatches.", table_text), Paragraph("Added metalWeightGrams, dimensionsInches, and minSafetyLimit columns.", table_text)],
        [Paragraph("02/08/2026", table_text), Paragraph("UI Scaffolding", table_text), Paragraph("Antigravity", table_text), Paragraph("Build React header & catalog components with warm amber theme.", table_text), Paragraph("Refactored generic layout to copper Yantras & Pooja items aesthetic.", table_text)],
        [Paragraph("15/08/2026", table_text), Paragraph("Factory Portal", table_text), Paragraph("Antigravity", table_text), Paragraph("Create factory batch entry form in React updating MySQL stock.", table_text), Paragraph("Added server-side validation rejecting negative batch quantities.", table_text)],
        [Paragraph("28/08/2026", table_text), Paragraph("Stock Toggle", table_text), Paragraph("Antigravity", table_text), Paragraph("Implement Admin Stock Toggle switch for real-time ON/OFF state.", table_text), Paragraph("Connected state handlers to catalog storage key for live customer sync.", table_text)],
        [Paragraph("05/09/2026", table_text), Paragraph("Quantity Stepper", table_text), Paragraph("Antigravity", table_text), Paragraph("Replace static Add button with inline quantity steppers (- count +).", table_text), Paragraph("Updated stepper logic so decrementing past 1 purges item from cart.", table_text)],
        [Paragraph("12/09/2026", table_text), Paragraph("PDF Invoice", table_text), Paragraph("ChatGPT", table_text), Paragraph("Write PDF invoice generation script with consecration notice.", table_text), Paragraph("Refactored template with structured table layout & GSTIN details.", table_text)],
        [Paragraph("18/09/2026", table_text), Paragraph("AI Chatbot", table_text), Paragraph("Antigravity", table_text), Paragraph("Build AI Spiritual Assistant chatbot for placement & order lookup.", table_text), Paragraph("Connected query handler to active order state for live tracking lookup.", table_text)],
        [Paragraph("25/09/2026", table_text), Paragraph("Image Sync", table_text), Paragraph("Antigravity", table_text), Paragraph("Assign unique /items/... image paths for all 18 catalog products.", table_text), Paragraph("Bumped catalog storage key to bhavna_pooja_catalog_v19 for refresh.", table_text)],
        [Paragraph("27/09/2026", table_text), Paragraph("Report & PDF", table_text), Paragraph("Claude", table_text), Paragraph("Compile Chapter 4 documentation, ER, Use Cases, 80 Test Cases & PDF.", table_text), Paragraph("Generated official formatted PDF report document with product image previews.", table_text)]
    ]

    ai_table = Table(ai_journey_data, colWidths=[65, 80, 60, 145, 150])
    ai_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary),
        ('GRID', (0,0), (-1,-1), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
    ]))
    story.append(ai_table)

    # Build document
    doc.build(story, canvasmaker=NumberedCanvas)
    print("PDF build successful:", pdf_path)

if __name__ == '__main__':
    build_pdf()
